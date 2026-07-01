# Documentación del Motor "Neuro-Sync Engine v10.0: Mente Emergente"

Este documento detalla la arquitectura de vanguardia del motor de animación v10.0, diseñado para ofrecer una experiencia inmersiva de neurociencia interactiva, sensorial y algorítmicamente profunda.

## Arquitectura Biológica y Sensorial (v10.0)

### 1. Aprendizaje Hebbiano (Hebbian Learning)
Se implementa un algoritmo dinámico basado en la máxima de Donald Hebb: *"Neurons that fire together, wire together"*.
- **Refuerzo por Co-activación:** Las conexiones entre nodos que se activan en una ventana temporal cercana incrementan su atributo `strength`. Visualmente, esto se representa con degradados de color (neón a blanco) y mayor grosor.
- **Decaimiento Sináptico:** Las conexiones infrautilizadas experimentan un decaimiento gradual, optimizando la topología de la red para representar los "caminos de pensamiento" más frecuentes del usuario.

### 2. Avalanchas Neurales y Emergencia
El motor simula la dinámica crítica de las redes biológicas:
- **Puntos de Ignición:** Cuando un nodo alcanza un umbral de activación crítico, dispara una cascada recursiva hacia sus vecinos (visibles como partículas de luz que viajan por las conexiones).
- **Propagación No Lineal:** Estas "avalanchas" crean patrones visuales complejos que imitan los momentos de *Insight* o epifanías cognitivas.

### 3. Estética Analógica y Procesamiento Visual (Nuevo en v10.0)
Se ha implementado una capa de post-procesamiento visual para evocar un entorno de laboratorio científico de alta gama:
- **Superposición CRT:** Líneas de escaneo dinámicas que recrean la textura de un monitor de fósforo antiguo.
- **Grano de Película:** Un ruido sutil y dinámico que añade profundidad orgánica a la oscuridad del fondo.
- **Bloom y Mezcla Aditiva:** Los elementos activos emiten un resplandor (glow) mediante múltiples capas de renderizado con `globalCompositeOperation = 'lighter'`.

### 4. Audio Sinestésico y Visualizador de Frecuencia
Evolución de la Web Audio API para una retroalimentación auditiva biológica:
- **Osciloscopio en Tiempo Real:** Visualización de la forma de onda del sonido generado, actuando como un electroencefalograma (EEG) en el Dashboard.
- **Síntesis Espacial:** El tono (pitch) de los pulsos varía según la posición vertical del puntero, y el paneo estéreo responde a la posición horizontal.

### 5. Dashboard de Métricas de Estado
Interfaz de control que permite monitorear el estado interno de la simulación:
- **Conectividad:** Porcentaje de saturación de la red.
- **Dopamina:** Representa la densidad de partículas libres y la velocidad de los procesos.
- **Plasticidad:** Mide el ritmo al que la red puede reconfigurarse ante nuevos estímulos.
- **Entropía Mental:** Métrica que calcula el desorden termodinámico de la red en tiempo real.

## Interactividad y Control de Estado

### 1. Estados Mentales Predefinidos
El usuario puede cambiar la "personalidad" de la red mediante los botones del dashboard:
- **FOCO:** Alta velocidad, baja entropía, conexiones directas.
- **CREATIVIDAD:** Alta densidad de neurotransmisores, pulsos frecuentes, colores vibrantes.
- **CALMA:** Movimiento fluido, tonos verdes, baja actividad.
- **CAOS CONTROLADO:** Criticalidad máxima, avalanchas constantes, alta entropía.

### 2. Manipulación Directa
- **Arrastre de Conceptos:** Los nodos etiquetados (Resiliencia, Epigenética, etc.) pueden ser arrastrados para reconfigurar la topología local de la red.
- **Disparo de Insights:** Un clic en el fondo oscuro genera un pulso de información que se propaga por toda la red, incrementando el contador de eventos de insight.

## Implementación Técnica

El motor está escrito en JavaScript puro utilizando el API de Canvas 2D para máxima eficiencia de renderizado a 60 FPS. Todo el código está integrado en el bloque `<script>` final de `index_single.html`, garantizando que el blog sea un recurso educativo 100% autónomo y portable.
