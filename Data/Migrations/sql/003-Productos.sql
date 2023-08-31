CREATE OR REPLACE VIEW "Productos"
AS
SELECT
P."DependenciaId",
D."Nombre" AS "DependenciaNombre",
P."Id",
P."Nombre",
P."Descripcion",
P."Orden",
P."Activo",
P."CreadoEl",
P."CreadoPor",
P."EditadoEl",
P."EditadoPor"
FROM "Producto" P
LEFT OUTER JOIN "Clasificador" D
ON P."DependenciaId" = D."Id"