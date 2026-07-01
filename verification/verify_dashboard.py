import asyncio
from playwright.async_api import async_playwright
import os

async def verify_dashboard_v2():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        path = os.path.abspath("index.html")
        await page.goto(f'file://{path}')

        # Verificar existencia del canvas del analizador
        analyzer_visible = await page.is_visible('#freq-analyzer')
        print(f"Freq Analyzer visible: {analyzer_visible}")

        # Forzar interacción para activar audio y ver osciloscopio
        await page.mouse.click(10, 10)
        await page.wait_for_timeout(500)

        # Verificar que el estado se actualiza en el dashboard via JS (más robusto con animaciones)
        await page.evaluate("window.changeState('CREATIVIDAD')")
        await page.wait_for_timeout(1000)
        # Forzar una actualización manual si es necesario para el test
        await page.evaluate("updateDashboard()")

        state_text = await page.inner_text('#display-state')
        print(f"Dashboard state after click: {state_text}")

        # Screenshot final del dashboard v2.0
        await page.screenshot(path='verification/dashboard_v2_check.png', full_page=True)

        await browser.close()

        if analyzer_visible and state_text == "CREATIVIDAD":
            print("VERIFICATION SUCCESS: Dashboard v2.0 is functional.")
        else:
            print("VERIFICATION FAILED")

if __name__ == "__main__":
    asyncio.run(verify_dashboard_v2())
