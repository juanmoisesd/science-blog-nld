import asyncio
from playwright.async_api import async_playwright
import os

async def verify_audio():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        path = os.path.abspath("index.html")
        await page.goto(f"file://{path}")

        await page.mouse.click(100, 100)

        # Verificar integridad del objeto neuroAudio
        audio_integrity = await page.evaluate("""() => {
            return neuroAudio instanceof NeuroAudio &&
                   neuroAudio.osc1 instanceof OscillatorNode &&
                   neuroAudio.masterGain instanceof GainNode;
        }""")
        print(f"Audio integrity check: {audio_integrity}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_audio())
