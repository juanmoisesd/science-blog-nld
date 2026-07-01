import os
from playwright.sync_api import sync_playwright

def verify_v7():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Obtener ruta absoluta al archivo local
        path = os.path.abspath("index.html")
        page.goto(f"file://{path}")

        # Esperar a que el motor se inicialice
        page.wait_for_timeout(2000)

        # 1. Screenshot de la Home (Enfoque)
        page.screenshot(path="verification/v7_homepage.png")
        print("Capturada v7_homepage.png")

        # 2. Cambiar a Creatividad y verificar dashboard
        page.click("button#btn-creatividad")
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/v7_creatividad.png")
        print("Capturada v7_creatividad.png")

        # 3. Verificar que el estado en el dashboard cambió
        state_text = page.inner_text("#display-state")
        print(f"Estado en Dashboard: {state_text}")

        # 4. Scroll para activar Scroll-Sync
        page.evaluate("window.scrollTo(0, document.body.scrollHeight / 2)")
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/v7_scroll.png")
        print("Capturada v7_scroll.png")

        browser.close()

if __name__ == "__main__":
    verify_v7()
