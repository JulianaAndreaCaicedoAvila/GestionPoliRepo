CREATE OR REPLACE VIEW "TerritorialesDepartamentos" AS
SELECT
TD."Id",
TD."TerritorialId",
T."Nombre" AS "TerritorialNombre",
TD."DepartamentoId",
D."Nombre" AS "DepartamentoNombre"
FROM "Clasificador" T
RIGHT OUTER JOIN "TerritorialDepartamento" TD
ON T."Id" = TD."TerritorialId"
LEFT OUTER JOIN "Clasificador" D
ON D."Id" = TD."DepartamentoId"