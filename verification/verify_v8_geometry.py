import asyncio
from playwright.async_api import async_playwright
import os

async def verify_geometry():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Cargar el archivo local
        path = os.path.abspath("index.html")
        await page.goto(f"file://{path}")

        # Esperar a que el canvas se inicialice
        await page.wait_for_selector("#neural-network")

        # Esperar un momento para que se rendericen las neuronas
        await asyncio.sleep(2)

        # Captura de pantalla para inspección visual de la nueva geometría
        await page.screenshot(path="verification/v8_geometry_check.png")

        # Verificar si la clase Particle tiene los nuevos atributos
        has_soma = await page.evaluate("() => particles.every(p => p.somaPoints !== undefined)")
        print(f"Has soma points: {has_soma}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_geometry())
