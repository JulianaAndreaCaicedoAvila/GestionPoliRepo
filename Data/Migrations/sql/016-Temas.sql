CREATE OR REPLACE VIEW "Temas" AS
SELECT
T."ModuloId",
M."Nombre" AS "ModuloNombre",
T."DependenciaId",
C."Nombre" AS "DependenciaNombre",
T."Id",
T."Nombre",
T."CreadoEl",
T."EditadoEl",
T."Activo",
T."CreadoPor",
T."EditadoPor",
T."Orden"
FROM "Tema" T
LEFT OUTER JOIN "Clasificador" C
ON T."DependenciaId" = C."Id"
LEFT OUTER JOIN "Modulo" M
ON T."ModuloId" = M."Id"