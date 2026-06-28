import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Verify index.html
        path = "file://" + os.path.abspath("index.html")
        await page.goto(path)
        await page.wait_for_timeout(2000)
        await page.screenshot(path="/home/jules/verification/home_v3.png")
        print("Home screenshot saved.")

        # Verify article
        path_art = "file://" + os.path.abspath("articulos/neuroplasticidad.html")
        await page.goto(path_art)
        await page.wait_for_timeout(1000)
        await page.screenshot(path="/home/jules/verification/article_v3.png", full_page=True)
        print("Article screenshot saved.")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
