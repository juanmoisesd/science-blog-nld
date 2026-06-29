# Documentación del Motor de Animación "Neuro-Sync"

Este documento detalla la arquitectura y el mantenimiento de la animación interactiva integrada en el blog.

## Arquitectura Técnica

### 1. El Motor de Animación (`assets/js/animacion.js`)
- **Tecnología:** HTML5 Canvas API.
- **Sistema de Partículas:** Representa "neuronas" (nodos) y "sinapsis" (conexiones).
- **Lógica de Impulsos:** Utiliza una clase `Pulso` para simular la transmisión de información entre nodos con trayectorias calculadas mediante interpolación lineal.

### 2. Estados Mentales (Reactividad)
La animación reacciona a tres estados predefinidos que cambian el comportamiento del canvas y los estilos CSS globales:

- **Enfoque (`enfoque`):** Alta velocidad, colores azules, menos nodos activos para minimizar distracciones.
- **Creatividad (`creatividad`):** Velocidad moderada, colores púrpuras, máximo de conexiones y pulsos erráticos.
- **Calma (`calma`):** Velocidad lenta, colores turquesas, movimiento suave y orgánico.

### 3. Integración CSS
Se utilizan variables CSS (`--primary-color`, `--accent-glow`) para sincronizar la interfaz de usuario con el estado de la animación. El cambio de clase en el elemento `<body>` dispara las transiciones visuales.

## Mantenimiento y Extensión

- **Añadir Nodos:** Los nodos se generan dinámicamente según el tamaño de la ventana. Para aumentar la densidad, modificar la variable `density` en el constructor de `NeuroSync`.
- **Nuevos Estados:** Para añadir un estado, se debe definir el nuevo esquema de colores en `assets/css/estilos.css` y actualizar el método `setState` en `animacion.js`.

## Rendimiento
- Se utiliza `requestAnimationFrame` para asegurar 60 FPS.
- La detección de colisiones e interacciones del ratón está optimizada para evitar cálculos innecesarios en cada frame.
