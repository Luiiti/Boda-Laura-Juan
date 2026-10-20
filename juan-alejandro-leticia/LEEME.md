# Invitación de Juan Alejandro y Leticia

24 de abril de 2027, 12:00 · Finca Montenmedio.

Sitio público: https://luiiti.github.io/Boda-Laura-Juan/juan-alejandro-leticia/

## Activar la confirmación de asistencia

1. Crear y publicar el formulario de asistencia en Google Forms.
2. En **Respuestas → Vincular con Hojas de cálculo**, seleccionar la hoja de respuestas nueva o existente.
3. Copiar el enlace público para responder al formulario.
4. Editar `config.js` en esta carpeta, añadir ese enlace entre las comillas de `googleFormUrl` y guardar el cambio en la rama `main`.
5. GitHub Pages actualizará la invitación. El botón abrirá el formulario y se retirará automáticamente el aviso «Muy pronto».

La hoja de Google Sheets no se enlaza en la web pública. Las respuestas las registra Google Forms directamente en la hoja vinculada. Aún no se ha creado ningún formulario ni hoja de respuestas para esta invitación.

El enlace de ubicación se puede ajustar en `mapsUrl`, dentro de `config.js`, si hay un acceso concreto para invitados.

## Diseño y recursos

La imagen original «reserva la fecha» se conserva en `assets/save-the-date.jpg` como referencia y tarjeta de vista previa al compartir.

Las manos y la firma se han convertido a curvas SVG nativas, sin fondos de imagen. Al abrir el sobre, un hilo llega desde la izquierda y forma las manos; después se escriben los nombres siguiendo máscaras de trazos curvos. La secuencia dura aproximadamente nueve segundos. Se puede saltar o repetir y respeta la preferencia de movimiento reducido. `story.js` coordina la secuencia; `story.css` define la nueva composición.

La firma cuenta con contornos reconstruidos a precisión subpíxel y curvas suavizadas para retirar las irregularidades del archivo de referencia. Conserva el estilo manuscrito y los recorridos de la animación.

La textura `assets/papel-algodon.webp` se creó mediante la herramienta integrada de generación de imágenes y se optimizó para la web. Prompt: «Ultra realistic close-up flat scan of warm ivory white handmade cotton rag paper, fine visible natural fibers, subtle tiny irregularities, soft elegant grain. Full bleed square composition, perfectly flat surface, evenly lit diffuse natural daylight, very light warm white color, nearly uniform tone, tactile premium letterpress stationery. No objects, no envelope, no folds, no text, no illustration, no borders, no dramatic shadows, no gradients, no vignette.»

Las fuentes Cormorant Garamond, Jost y Allura se sirven desde `assets/fonts/`, donde se incluyen sus licencias SIL Open Font License.

La ilustración de la finca es decorativa. Ubicación de referencia: https://dehesamontenmedio.com/bodas-eventos/.
