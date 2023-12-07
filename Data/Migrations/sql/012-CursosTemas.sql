CREATE OR REPLACE VIEW "CursosTemas" AS
SELECT
CT."Id",
CT."CursoId",
CT."TemaId",
T."Nombre" AS "TemaNombre",
T."DependenciaId",
D."Nombre" AS "DependenciaNombre",
CT."DocenteId",
U."FirstName" || ' ' || U."LastName" AS "DocenteNombre",
U."Email" AS "DocenteCorreo",
CT."LugarRealizacion",
CT."DireccionRealizacion",
CT."Activo",
CT."CreadoEl",
CT."CreadoPor",
CT."EditadoEl",
CT."EditadoPor",
CT."Orden"
FROM "CursoTema" CT
LEFT OUTER JOIN "Tema" T
ON CT."TemaId" = T."Id"
LEFT OUTER JOIN "Clasificador" D
ON T."DependenciaId" = D."Id"
LEFT OUTER JOIN "AuthUsers" U
ON CT."DocenteId" = U."Id"