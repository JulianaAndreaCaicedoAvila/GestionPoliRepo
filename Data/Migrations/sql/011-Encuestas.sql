CREATE OR REPLACE VIEW "Encuestas" AS
SELECT
e."Id",
e."Titulo",
e."Descripcion",
e."CreadoEl",
e."EditadoEl",
e."Activo",
e."CreadoPor",
e."EditadoPor",
e."Orden",
(SELECT COUNT(*) FROM "EncuestaPregunta" WHERE "EncuestaId" = e."Id") AS "Preguntas"
FROM "Encuesta" e