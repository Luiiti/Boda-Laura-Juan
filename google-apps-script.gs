/**
 * EJEMPLO OPCIONAL PARA GOOGLE SHEETS
 *
 * Úsalo solo si más adelante decides sustituir Google Forms
 * por un formulario HTML propio.
 *
 * 1. Crea una hoja de cálculo.
 * 2. Extensiones > Apps Script.
 * 3. Pega este código.
 * 4. Implementar > Nueva implementación > Aplicación web.
 * 5. Ejecutar como: tú.
 * 6. Acceso: cualquier persona.
 */

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Respuestas");
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.nombre || "",
    data.asistencia || "",
    data.numeroInvitados || "",
    data.alergias || "",
    data.autobus || "",
    data.comentarios || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
