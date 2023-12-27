CREATE OR REPLACE VIEW "CursosDocumentos" AS
SELECT
CD."Id",
CD."CursoId",
CD."TipoDocumentoId",
CT."Nombre" AS "TipoDocumentoNombre",
CD."Nombre",
CD."ArchivoNombre",
CD."ArchivoPeso",
CD."CreadoEl",
CD."EditadoEl",
CD."Activo",
CD."CreadoPor",
CD."EditadoPor",
CD."Orden"
FROM "CursoDocumento" CD
LEFT OUTER JOIN "Clasificador" CT
ON CD."TipoDocumentoId" = CT."Id"