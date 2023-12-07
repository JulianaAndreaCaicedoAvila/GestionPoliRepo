CREATE OR REPLACE VIEW "ProductosIndicadores" AS
SELECT 
PI."Id",
PI."ProductoId",
P."Nombre" AS "ProductoNombre",
PI."IndicadorId",
I."Nombre" AS "IndicadorNombre"
FROM "Producto" P
RIGHT OUTER JOIN "ProductoIndicador" PI
ON P."Id" = PI."ProductoId"
LEFT OUTER JOIN "Indicador" I
ON I."Id" = PI."IndicadorId"