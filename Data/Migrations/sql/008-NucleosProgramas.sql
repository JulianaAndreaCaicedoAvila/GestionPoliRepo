CREATE OR REPLACE VIEW "NucleosProgramas" AS
SELECT 
BPN."Id",
BPN."BancoId",
BPN."NucleoId",
BP."Nombre" AS "BancoProgramaNombre",
N."Nombre" AS "NucleoNombre"
FROM "BancoPrograma" BP
RIGHT OUTER JOIN "BancoProgramaNucleo" BPN
ON BP."Id" = BPN."BancoId"
LEFT OUTER JOIN "Nucleo" N
ON N."Id" = BPN."NucleoId"