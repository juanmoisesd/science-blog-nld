import asyncio
import os
from playwright.async_api import async_playwright

async def verify_v6_final():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        file_path = f"file://{os.path.abspath('index_single.html')}"
        await page.goto(file_path)

        os.makedirs("verification", exist_ok=True)

        # Take screenshot of homepage
        await page.screenshot(path="verification/final_v6_homepage.png", full_page=True)

        # Interact with Creativity state
        await page.click("button:has-text('Creatividad')")
        await asyncio.sleep(1)
        await page.screenshot(path="verification/final_v6_creatividad.png", full_page=True)

        # Interact with Calma state
        await page.click("button:has-text('Calma')")
        await asyncio.sleep(1)
        await page.screenshot(path="verification/final_v6_calma.png", full_page=True)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_v6_final())
