import asyncio
from playwright.async_api import async_playwright

async def verify_sculpting():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        import os
        path = os.path.abspath("index.html")
        await page.goto(f'file://{path}')

        # Esperar a que las partículas se inicialicen
        await page.wait_for_timeout(1000)

        initial_count = await page.evaluate("particles.length")
        print(f"Initial particles: {initial_count}")

        # Simular Click Largo (Creación)
        canvas_box = await page.locator('#neural-network').bounding_box()
        x = canvas_box['x'] + 500
        y = canvas_box['y'] + 500

        await page.mouse.move(x, y)
        await page.mouse.down()
        await page.wait_for_timeout(500) # > 200ms
        await page.mouse.up()

        after_creation = await page.evaluate("particles.length")
        print(f"Particles after long click: {after_creation}")

        # Simular Click Corto cerca de la nueva partícula para Poda (Eliminación)
        # La nueva partícula debería estar en (x-rect.left, y-rect.top)
        # Vamos a buscarla en el array para ser precisos
        p_coords = await page.evaluate("(args) => { return {x: args.x, y: args.y} }", {"x": 500, "y": 500})

        await page.mouse.click(x, y) # Click corto
        await page.wait_for_timeout(200)

        after_deletion = await page.evaluate("particles.length")
        print(f"Particles after short click: {after_deletion}")

        await browser.close()

        if after_creation > initial_count and after_deletion < after_creation:
            print("VERIFICATION SUCCESS: Sculpting and Pruning work.")
        else:
            print("VERIFICATION FAILED")

if __name__ == "__main__":
    asyncio.run(verify_sculpting())
