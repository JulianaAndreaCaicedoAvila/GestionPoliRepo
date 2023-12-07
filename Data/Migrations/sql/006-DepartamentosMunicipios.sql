CREATE OR REPLACE VIEW "DepartamentosMunicipios" AS
SELECT
DM."Id",
DM."DepartamentoId",
D."Nombre" AS "DepartamentoNombre",
DM."MunicipioId",
M."Nombre" AS "MunicipioNombre"
FROM "Clasificador" D
RIGHT OUTER JOIN "DepartamentoMunicipio" DM
ON D."Id" = DM."DepartamentoId"
LEFT OUTER JOIN "Clasificador" M
ON M."Id" = DM."MunicipioId"