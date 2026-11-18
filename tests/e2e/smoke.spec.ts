import { expect, test, type Page } from "@playwright/test";

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
  // Scoped to the hero: the grid's quick add for Soft Dove has the same label.
  const hero = page.locator("section").filter({ has: page.locator("[data-hero-bottle]") });
  const heroAdd = hero.getByRole("button", { name: "Add Soft Dove, 50 ml, ₹599 to bag" });
  await heroAdd.click();
  const bag = page.getByRole("dialog", { name: "Your bag" });
  await expect(bag).toContainText("Soft Dove");
  await page.keyboard.press("Escape");
  await expect(bag).toBeHidden();
  await heroAdd.click();
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

test.describe("phone polish", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("quick add confirms the tap", async ({ page }) => {
    await page.goto("/fragrances");
    const button = page.getByRole("button", { name: "Add Cold Water, 50 ml, ₹599 to bag" });
    await button.click();
    await expect(button).toContainText("Added ✓");
    const bag = page.getByRole("dialog", { name: "Your bag" });
    await expect(bag).toBeVisible();
    await expect(bag).toContainText("Cold Water");
  });

  test("sticky add bar on phones", async ({ page }) => {
    await page.goto("/fragrances/soft-dove");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const bar = page.locator("[data-sticky-bar][data-shown]");
    await expect(bar).toBeVisible();
    await bar.getByRole("button", { name: /add to bag/i }).click();
    const bag = page.getByRole("dialog", { name: "Your bag" });
    await expect(bag).toContainText("Soft Dove");
    await page.keyboard.press("Escape");
    await expect(bag).toBeHidden();

    const wa = await page.locator(".whatsapp-float").boundingBox();
    const sb = await page.locator("[data-sticky-bar]").boundingBox();
    expect(wa && sb).toBeTruthy();
    const overlap =
      wa!.x < sb!.x + sb!.width &&
      wa!.x + wa!.width > sb!.x &&
      wa!.y < sb!.y + sb!.height &&
      wa!.y + wa!.height > sb!.y;
    expect(overlap, "WhatsApp button covers the sticky bar").toBe(false);

    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(page.locator("[data-sticky-bar]")).toBeHidden();
  });

  test("filters swipe on phones", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto("/fragrances");
    const scent = page.getByRole("group", { name: /filter by scent/i });
    const swipes = await scent.evaluate((el) => el.scrollWidth > el.clientWidth);
    expect(swipes).toBe(true);
    const fits = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
    expect(fits).toBe(true);
  });
});

async function collectJs(page: Page) {
  const bodies: Promise<string>[] = [];
  page.on("response", (res) => {
    if (res.url().endsWith(".js") || res.headers()["content-type"]?.includes("javascript")) {
      bodies.push(res.text().catch(() => ""));
    }
  });
  return async () => (await Promise.all(bodies)).filter((b) => b.includes("WebGLRenderer")).length;
}

test("3D stays off other pages", async ({ page }) => {
  const webglScripts = await collectJs(page);
  for (const path of ["/fragrances", "/fragrances/soft-dove"]) {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
  }
  expect(await webglScripts()).toBe(0);
});

test("reduced motion keeps the drawing", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  const webglScripts = await collectJs(page);
  await page.goto("/");
  await page.waitForTimeout(2000);
  await expect(page.locator("[data-hero-bottle] canvas")).toHaveCount(0);
  await expect(page.locator("[data-hero-bottle] svg").first()).toBeVisible();
  expect(await webglScripts()).toBe(0);
  await context.close();
});

test("sticky add bar never hides the footer on phones", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/fragrances/soft-dove");
  await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
  const bar = page.locator("[data-sticky-bar][data-shown]");
  await expect(bar).toBeVisible();
  const copyright = page.locator("footer").getByText(/©/);
  const [b, c] = [await bar.boundingBox(), await copyright.boundingBox()];
  expect(b && c && c.y + c.height <= b.y, "footer © line is under the sticky bar").toBe(true);
});
