
import asyncio
from playwright.async_api import async_playwright
import os

async def verify_final():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1920, 'height': 1080})

        file_path = "file://" + os.path.abspath("index.html")
        await page.goto(file_path)
        await page.wait_for_timeout(2000)

        # Saltarse el onboarding
        try:
            await page.get_by_role("button", name="SIGUIENTE >").click()
            await page.wait_for_timeout(500)
            await page.get_by_role("button", name="ENTENDIDO >").click()
            await page.wait_for_timeout(500)
            await page.get_by_role("button", name="CONTINUAR >").click()
            await page.wait_for_timeout(500)
            await page.get_by_role("button", name="INICIALIZAR KERNEL").click()
        except:
             await page.add_style_tag(content="#modal-inicio { display: none !important; }")

        await page.wait_for_timeout(2000)

        # Probar Research Portal
        await page.click("#btn-explicar")
        await page.wait_for_timeout(1000)
        text = await page.inner_text("#texto-academico")
        word_count = len(text.split())
        print(f"WORD_COUNT_V6: {word_count}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_final())
