import { expect, test } from "@playwright/test";

test("browse → filter → product → add to bag → order on WhatsApp", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("stays with you");

  // "Shop by who it's for" tile lands on a filtered collection.
  await page
    .locator("#shop-for")
    .getByRole("link", { name: /for her/i })
    .click();
  await expect(page).toHaveURL(/\/fragrances\?for=her$/);
  await expect(page.getByText("Showing 3 of 9 perfumes")).toBeVisible();
  await expect(page.getByRole("link", { name: "Cold Water" })).toHaveCount(0);

  // Filters combine and can be cleared from the URL-backed chips.
  await page
    .getByRole("group", { name: /occasion/i })
    .getByRole("button", { name: "Evening" })
    .click();
  await expect(page).toHaveURL(/for=her&occasion=evening/);
  await expect(page.getByText("Showing 2 of 9 perfumes")).toBeVisible();

  await page.getByRole("link", { name: "No. 5" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "No. 5" })).toBeVisible();

  await page.locator("label", { hasText: "100 ml" }).click();
  await page.getByRole("button", { name: /add to bag/i }).click();

  const bag = page.getByRole("dialog", { name: "Your bag" });
  await expect(bag).toBeVisible();
  await expect(bag).toContainText("No. 5");
  await expect(bag).toContainText("₹1,199");

  await bag.getByRole("button", { name: /increase quantity of no. 5/i }).click();
  await expect(bag).toContainText("₹2,398");

  const order = bag.getByRole("link", { name: "Order on WhatsApp" });
  const href = decodeURIComponent((await order.getAttribute("href")) ?? "");
  expect(href).toContain("https://wa.me/");
  expect(href).toContain("No. 5, 100 ml × 2");

  // Bag survives a reload.
  await page.keyboard.press("Escape");
  await expect(bag).toBeHidden();
  await page.reload();
  await expect(page.getByRole("button", { name: "Open bag, 2 items" })).toBeVisible();
});

test("quick add from a product card", async ({ page }) => {
  await page.goto("/fragrances");
  await page.getByRole("button", { name: "Add Black J, 50 ml, ₹599 to bag" }).click();
  const bag = page.getByRole("dialog", { name: "Your bag" });
  await expect(bag).toContainText("Black J");
  await expect(bag).toContainText("50 ml");
});

test("no sideways scrolling on small phones", async ({ page }) => {
  for (const width of [320, 360]) {
    await page.setViewportSize({ width, height: 740 });
    for (const path of ["/", "/fragrances", "/fragrances/molten-caramel"]) {
      await page.goto(path);
      const fits = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
      expect(fits, `${path} overflows at ${width}px`).toBe(true);
    }
  }
  await expect(page.getByRole("button", { name: /open bag/i })).toBeInViewport();
});

test("unknown product returns 404", async ({ page }) => {
  const res = await page.goto("/fragrances/does-not-exist");
  expect(res?.status()).toBe(404);
});

test("hero adds the bestseller", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Our bestseller")).toBeVisible();
  await page.getByRole("button", { name: "Add 50 ml — ₹599" }).click();
  const bag = page.getByRole("dialog", { name: "Your bag" });
  await expect(bag).toContainText("Soft Dove");
  await page.keyboard.press("Escape");
  await expect(bag).toBeHidden();
  await page.getByRole("button", { name: "Add 50 ml — ₹599" }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open bag, 2 items" })).toBeVisible();
});

test("hero works without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`http://localhost:${process.env.PORT ?? 3000}/`);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("stays with you");
  await expect(page.getByRole("heading", { level: 2, name: "Soft Dove" }).first()).toBeVisible();
  await expect(page.locator("[data-hero-bottle] svg").first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Shop all perfumes" }).first()).toBeVisible();
  await context.close();
});

test("landscape phone keeps the hero inside the screen", async ({ page }) => {
  await page.setViewportSize({ width: 800, height: 360 });
  await page.goto("/");
  const fits = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
  expect(fits).toBe(true);
  const box = await page.locator("[data-hero-bottle]").boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(800);
});
