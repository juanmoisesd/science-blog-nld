# Documentación del Motor "Neuro-Sync Engine v8.0: Synesthetic Connectome"

Este documento detalla la arquitectura de vanguardia del motor de animación v8.0, diseñado para ofrecer una experiencia inmersiva de neurociencia interactiva y sensorial.

## Arquitectura Biológica y Sensorial (v8.0)

### 1. Geometría Neuronal Procedural (Fractal)
Se abandona la representación de nodos simples por una morfología de soma y dendritas:
- **Ramificación Dendrítica:** Uso de sistemas-L simplificados para generar arborizaciones que buscan activamente conexiones con neuronas vecinas.
- **Morfología Dinámica:** El tamaño del soma y la complejidad de las dendritas varían según la "edad" (tiempo de vida) y actividad de la neurona.

### 2. Audio Sinestésico (Brainwave Synthesis)
Integración de la Web Audio API para una retroalimentación auditiva biológica:
- **Binaural Beats:** Generación de frecuencias base (Alpha para Calma, Beta para Enfoque, Gamma para Creatividad).
- **Disparos Sinápticos:** Cada pulso genera un evento sonoro (oscilador con envolvente exponencial) cuya frecuencia depende de la posición espacial de la neurona.

### 3. Plasticidad Sináptica (Crecimiento y Poda)
A diferencia de las versiones anteriores, las conexiones (axones) no son estáticas:
- **Crecimiento (Growth):** Las sinapsis se fortalecen y se vuelven más visibles con el uso (frecuencia de pulsos).
- **Poda (Pruning):** Las conexiones inactivas pierden opacidad y eventualmente desaparecen, simulando el proceso biológico de optimización neural.
- **Curvatura Orgánica:** Uso de curvas de Bezier de tercer grado para representar la morfología neuronal.

### 4. Dinámica de Neurotransmisores
Se implementa un sistema secundario de micro-partículas que representan mensajeros químicos:
- **Dopamina (Amarillo/Brillante):** Partículas rápidas que aumentan la velocidad de los nodos y la frecuencia de pulsos al contacto.
- **Serotonina (Azul/Calma):** Partículas lentas que estabilizan los nodos y reducen la turbulencia física.

### 5. Avalanchas Neurales (Emergencia)
El motor detecta "puntos de ignición". Cuando un nodo recibe múltiples impulsos simultáneos, se dispara una *avalancha*: una onda de luz expansiva que recorre la red, simulando un momento de "Insight" o comprensión profunda.

## Interactividad de Capa Dual

### 1. Sincronización de Scroll (Scroll-Sync)
La intensidad de la simulación está ligada a la posición de lectura. Al leer los tratados científicos, la densidad de neurotransmisores y la velocidad de los pulsos aumentan, reflejando el "procesamiento cognitivo" del usuario.

### 2. Física de Resortes (Spring-Physics)
Los nodos principales son objetos físicos con masa y tensión. El usuario puede arrastrar conceptos como "Conciencia" o "Memoria", sintiendo la resistencia de la red conectada.

## Especificaciones Estéticas y Ópticas

- **Paralaje 3D:** Simulación de profundidad mediante capas con diferentes velocidades y desenfoque (Depth of Field).
- **HDR Bloom:** Los pulsos de "Insight" emiten luz con valores de luminancia expandidos, creando un efecto de incandescencia realista.
- **Textura:** Integración de ruido granulado (grain) mediante CSS para evocar la sensación de un laboratorio de investigación clásico (Dark Academic).
- **Variables Globales:** Sincronización total mediante variables CSS (`--accent-primary`, `--synapse-strength`) que permiten transiciones suaves entre estados mentales.

## Mantenimiento

Para ajustar la "inteligencia" de la red, modificar los coeficientes de `PLASTICITY_RATIO` e `insightThreshold` en `assets/js/animacion.js`. Para la síntesis de audio, consultar la clase `NeuroAudio`.
