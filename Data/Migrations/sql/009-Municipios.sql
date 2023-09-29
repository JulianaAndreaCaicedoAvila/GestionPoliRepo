CREATE OR REPLACE VIEW "Municipios" AS
SELECT
D."PaisId",
P."Nombre",
P."Iso1" AS "PaisIso1",
P."Iso2" AS "PaisIso2",
M."DepartamentoId",
D."Nombre" AS "DepartamentoNombre",
D."Codigo" AS "DepartamentoCodigo",
M."Id" AS "MunicipioId",
M."Nombre" AS "MunicipioNombre",
M."Codigo" AS "MunicipioCodigo"
FROM "Departamento" D
LEFT OUTER JOIN "Pais" P
ON D."PaisId" = P."Id"
RIGHT OUTER JOIN "Municipio" M
ON M."DepartamentoId" = D."Id"