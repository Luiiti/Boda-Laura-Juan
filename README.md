# Invitación de boda · Laura & Juan

Web preparada para publicarse gratuitamente mediante GitHub Pages.

## Archivos

- `index.html`: estructura de la invitación.
- `style.css`: diseño, colores y animaciones.
- `script.js`: apertura, cuenta atrás y enlaces.
- `google-apps-script.gs`: ejemplo opcional para guardar respuestas en Google Sheets.

## Cambiar la hora, Google Maps y formulario

Abre `script.js` y modifica:

```js
const CONFIG = {
  weddingDate: "2027-08-28T18:00:00+02:00",
  mapsUrl: "",
  rsvpUrl: ""
};
```

Ejemplo:

```js
mapsUrl: "https://maps.app.goo.gl/XXXXXXXX",
rsvpUrl: "https://forms.gle/XXXXXXXX"
```

## Publicar en GitHub Pages

1. Entra en GitHub.
2. Crea un repositorio público llamado `boda-laura-juan`.
3. Pulsa `Add file` > `Upload files`.
4. Sube `index.html`, `style.css`, `script.js` y el resto de archivos.
5. Pulsa `Commit changes`.
6. Entra en `Settings` > `Pages`.
7. En `Source`, elige `Deploy from a branch`.
8. Selecciona la rama `main` y la carpeta `/root`.
9. Pulsa `Save`.

La web quedará disponible en:

`https://TU-USUARIO.github.io/boda-laura-juan/`

## Importante

Para compartirla por WhatsApp debes enviar el enlace de GitHub Pages, no el archivo HTML.


## Música

La versión incluye un tema de piano instrumental original en:

`assets/audio/tema-laura-juan.mp3`

La música comienza al tocar el sello, lo que permite su reproducción en iPhone.
Después aparece un control flotante para pausarla o reanudarla.

Para cambiarla, sustituye ese MP3 por otro archivo con exactamente el mismo nombre.


## Versión 1.1

- Eliminado el texto sobre el inicio de la música.
- Eliminada la indicación «Pulsa el sello para abrir».
- El sello ahora llama la atención mediante un movimiento sutil, brillo y ondas concéntricas.
