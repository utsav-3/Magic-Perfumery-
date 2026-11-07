import { expect, test } from "@playwright/test";

test("browse → product → add to bag → order on WhatsApp", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("lights come on");

  await page.getByRole("link", { name: "Shop the collection" }).click();
  await expect(page).toHaveURL(/\/fragrances$/);

  // Filter narrows the grid.
  await page.getByRole("button", { name: /woody/i }).click();
  await expect(page.getByRole("link", { name: /alphonso/i })).toHaveCount(0);

  await page.getByRole("link", { name: /first rain/i }).click();
  await expect(page.getByRole("heading", { level: 1, name: "First Rain" })).toBeVisible();

  await page.getByText("100 ml").click();
  await page.getByRole("button", { name: /add to bag/i }).click();

  const bag = page.getByRole("dialog", { name: "Your bag" });
  await expect(bag).toBeVisible();
  await expect(bag).toContainText("First Rain");
  await expect(bag).toContainText("100 ml");
  await expect(bag).toContainText("₹7,800");

  await bag.getByRole("button", { name: /increase quantity of first rain/i }).click();
  await expect(bag).toContainText("₹15,600");

  const order = bag.getByRole("link", { name: "Order on WhatsApp" });
  const href = decodeURIComponent((await order.getAttribute("href")) ?? "");
  expect(href).toContain("https://wa.me/");
  expect(href).toContain("First Rain — Eau de Parfum, 100 ml × 2");

  // Bag survives a reload.
  await page.keyboard.press("Escape");
  await expect(bag).toBeHidden();
  await page.reload();
  await expect(page.getByRole("button", { name: "Open bag, 2 items" })).toBeVisible();
});

test("no sideways scrolling on small phones", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  for (const path of ["/", "/fragrances", "/fragrances/bhendi-bazaar"]) {
    await page.goto(path);
    const fits = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
    expect(fits, `${path} overflows at 360px`).toBe(true);
  }
  await expect(page.getByRole("button", { name: /open bag/i })).toBeInViewport();
});

test("unknown product returns 404", async ({ page }) => {
  const res = await page.goto("/fragrances/does-not-exist");
  expect(res?.status()).toBe(404);
});
