CREATE OR REPLACE VIEW "BancoProgramasNucleos" AS
SELECT
BN."Id",
BN."BancoId",
BN."NucleoId",
B."Nombre" AS "BancoProgramaNombre",
N."Nombre" AS "NucleoNombre"
FROM "BancoPrograma" B
RIGHT OUTER JOIN "BancoProgramaNucleo" BN
ON B."Id" = BN."BancoId"
LEFT OUTER JOIN "Nucleo" N
ON N."Id" = BN."NucleoId"