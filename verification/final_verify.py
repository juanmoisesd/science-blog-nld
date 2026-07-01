import asyncio
from playwright.async_api import async_playwright
import os

async def final_verification():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})
        path = os.path.abspath("index.html")
        await page.goto(f'file://{path}')

        # Esperar a que la animación se asiente
        await page.wait_for_timeout(2000)

        # Activar el audio y el dashboard haciendo click
        await page.mouse.click(100, 100)
        await page.wait_for_timeout(500)

        # Tomar screenshot de la sección Hero con el Dashboard
        await page.screenshot(path='verification/final_v8_view.png')
        await browser.close()
        print("Final screenshot captured at verification/final_v8_view.png")

if __name__ == "__main__":
    asyncio.run(final_verification())
