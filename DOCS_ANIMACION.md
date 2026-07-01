# Documentación del Motor "Neuro-Sync Engine v7.0: Deep Mind Emergence"

Este documento detalla la arquitectura de vanguardia del motor de animación v7.0, diseñado para ofrecer una experiencia inmersiva de neurociencia interactiva.

## Arquitectura Biológica (v7.0)

### 1. Plasticidad Sináptica (Crecimiento y Poda)
A diferencia de las versiones anteriores, las conexiones (axones) no son estáticas:
- **Crecimiento (Growth):** Las sinapsis se fortalecen y se vuelven más visibles con el uso (frecuencia de pulsos).
- **Poda (Pruning):** Las conexiones inactivas pierden opacidad y eventualmente desaparecen, simulando el proceso biológico de optimización neural.
- **Curvatura Orgánica:** Uso de curvas de Bezier de tercer grado para representar la morfología neuronal.

### 2. Dinámica de Neurotransmisores
Se implementa un sistema secundario de micro-partículas que representan mensajeros químicos:
- **Dopamina (Amarillo/Brillante):** Partículas rápidas que aumentan la velocidad de los nodos y la frecuencia de pulsos al contacto.
- **Serotonina (Azul/Calma):** Partículas lentas que estabilizan los nodos y reducen la turbulencia física.

### 3. Avalanchas Neurales (Emergencia)
El motor detecta "puntos de ignición". Cuando un nodo recibe múltiples impulsos simultáneos, se dispara una *avalancha*: una onda de luz expansiva que recorre la red, simulando un momento de "Insight" o comprensión profunda.

## Interactividad de Capa Dual

### 1. Sincronización de Scroll (Scroll-Sync)
La intensidad de la simulación está ligada a la posición de lectura. Al leer los tratados científicos, la densidad de neurotransmisores y la velocidad de los pulsos aumentan, reflejando el "procesamiento cognitivo" del usuario.

### 2. Física de Resortes (Spring-Physics)
Los nodos principales son objetos físicos con masa y tensión. El usuario puede arrastrar conceptos como "Conciencia" o "Memoria", sintiendo la resistencia de la red conectada.

## Especificaciones Estéticas

- **Post-procesamiento:** Simulación de *Bloom* (resplandor) y aberración cromática sutil en los bordes para una estética cinematográfica.
- **Textura:** Integración de ruido granulado (grain) mediante CSS para evocar la sensación de un laboratorio de investigación clásico (Dark Academic).
- **Variables Globales:** Sincronización total mediante variables CSS (`--accent-primary`, `--synapse-strength`) que permiten transiciones suaves entre estados mentales.

## Mantenimiento

Para ajustar la "inteligencia" de la red, modificar los coeficientes de `PLASTICITY_RATIO` e `insightThreshold` (anteriormente AVALANCHE_THRESHOLD) en `assets/js/animacion.js`.
