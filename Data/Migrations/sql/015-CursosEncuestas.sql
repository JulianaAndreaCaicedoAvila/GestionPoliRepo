CREATE OR REPLACE VIEW "CursosEncuestas" AS
SELECT
CE."CursoId",
C."Nombre" AS "CursoNombre",
CE."MomentoId",
"Clasificador"."Nombre" AS "MomentoNombre",
CE."Id",
E."Id" AS "EncuestaId",
E."Titulo",
E."Descripcion",
(SELECT COUNT(*) AS Num FROM "EncuestaPregunta" WHERE "EncuestaPregunta"."EncuestaId" = E."Id") AS "Preguntas",
CE."CreadoEl",
CE."EditadoEl",
CE."Activo",
CE."CreadoPor",
CE."EditadoPor",
CE."Orden"
FROM "CursoEncuesta" CE
LEFT OUTER JOIN "Encuesta" E
ON CE."EncuestaId" = E."Id"
LEFT OUTER JOIN "Curso" C
ON CE."CursoId" = C."Id"
LEFT OUTER JOIN "Clasificador"
ON CE."MomentoId" = "Clasificador"."Id"