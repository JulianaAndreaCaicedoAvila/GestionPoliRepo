CREATE OR REPLACE VIEW "Cursos" AS
SELECT
C."Id",
C."DependenciaId",
DP."Nombre" AS "DependenciaNombre",
C."TipoCursoId",
TC."Nombre" AS "TipoCursoNombre",
NV."EscuelaId",
ES."Nombre" AS "EscuelaNombre",
C."NivelId",
NV."Nombre" AS "NivelNombre",
C."TipoAsistenciaId",
TA."Nombre" AS "TipoAsistenciaNombre",
C."ElaboradoPorId",
EP."Nombre" AS "ElaboradoPorNombre",
C."IndicadorId",
"IN"."Nombre" AS "IndicadorNombre",
"IN"."ProductoId",
PR."Nombre" AS "ProductoNombre",
C."MunicipioId",
MN."Nombre" AS "MunicipioNombre",
MN."DepartamentoId",
DPT."Nombre" AS "DepartamentoNombre",
DPT."TerritorialId",
TER."Nombre" AS "TerritorialNombre",
DPT."PaisId",
PA."Nombre" AS "PaisNombre",
PA."Iso1" AS "PaisIso1",
PA."Iso2" AS "PaisIso2",
C."ProgramaId",
PG."Nombre" AS "ProgramaNombre",
PG."FechaInicio" AS "ProgramaFechaInicio",
PG."NucleoId",
NU."FechaInicio" AS "NucleoFechaInicio",
NU."Nombre" AS "NucleoNombre",
NU."BancoId",
BP."Nombre" AS "BancoNombre",
BP."FechaInicio" AS "BancoFechaInicio",
C."EstadoCursoId",
EC."Nombre" AS "EstadoCursoNombre",
C."CertificadoEtiquetaId",
CE."Nombre" AS "CertificadoEtiquetaNombre",
C."CupoTotal",
C."CupoAula",
C."Nombre",
C."Descripcion",
C."CodigoVerificacion",
C."Responsable",
C."CorreoElectronico",
C."TelefonoContacto",
C."HorasTotales",
C."NumeroDias",
C."PorcentajeValidoAsistencia",
C."CantidadAulas",
C."LugarRealizacion",
C."FechaInicioInscripcion",
C."FechaFinInscripcion",
C."FechaInicio",
C."FechaFin",
C."HoraInicio",
C."Publicado",
C."JornadaManana",
C."JornadaTarde",
C."JornadaNoche",
C."Objetivos",
C."Contenidos",
C."ImagenCertificado",
(SELECT "ArchivoNombre" FROM "CursoDocumento" WHERE "TipoDocumentoId"=383 AND "CursoId" = C."Id" AND ROWNUM = 1) AS "ImagenCurso",
C."CertificadoCiudad",
C."CertificadoVerCiudad",
C."CertificadoFechaExpedicion",
(SELECT COUNT(*) FROM "CursoDocumento" WHERE "CursoId" = C."Id" AND "TipoDocumentoId"=381) AS "Documentos",
(SELECT COUNT(*) FROM "CursoDocumento" WHERE "CursoId" = C."Id" AND "TipoDocumentoId"=383) AS "Imagenes",
(SELECT COUNT(*) FROM "CursoEncuesta" WHERE "CursoId" = C."Id") AS "Encuestas",
(SELECT COUNT(*) FROM "CursoFecha" WHERE "CursoId" = C."Id") AS "Fechas",
(SELECT COUNT(*) FROM "CursoTema" WHERE "CursoId" = C."Id") AS "Temas",
(SELECT COUNT(*) FROM "CursoUsuario" WHERE "CursoId" = C."Id") AS "Participantes",
C."CreadoEl",
C."EditadoEl",
C."Activo",
C."CreadoPor",
C."EditadoPor",
C."Orden"
FROM "Curso" C
LEFT OUTER JOIN "Clasificador" DP
ON C."DependenciaId" = DP."Id"
LEFT OUTER JOIN "Clasificador" TC
ON C."TipoCursoId" = TC."Id"
LEFT OUTER JOIN "Nivel" NV
ON C."NivelId" = NV."Id"
LEFT OUTER JOIN "Escuela" ES
ON NV."EscuelaId" = ES."Id"
LEFT OUTER JOIN "Clasificador" TA
ON C."TipoAsistenciaId" = TA."Id"
LEFT OUTER JOIN "Clasificador" EP
ON C."ElaboradoPorId" = EP."Id"
LEFT OUTER JOIN "Indicador" "IN"
ON C."IndicadorId" = "IN"."Id"
LEFT OUTER JOIN "Producto" PR
ON "IN"."ProductoId" = PR."Id"
LEFT OUTER JOIN "Municipio" MN
ON C."MunicipioId" = MN."Id"
LEFT OUTER JOIN "Departamento" DPT
ON MN."DepartamentoId" = DPT."Id"
LEFT OUTER JOIN "Clasificador" TER
ON DPT."TerritorialId" = TER."Id"
LEFT OUTER JOIN "Pais" PA
ON DPT."PaisId" = PA."Id"
LEFT OUTER JOIN "Programa" PG
ON C."ProgramaId" = PG."Id"
LEFT OUTER JOIN "Nucleo" NU
ON PG."NucleoId" = NU."Id"
LEFT OUTER JOIN "BancoPrograma" BP
ON NU."BancoId" = BP."Id"
LEFT OUTER JOIN "Clasificador" EC
ON C."EstadoCursoId" = EC."Id"
LEFT OUTER JOIN "Clasificador" CE
ON C."CertificadoEtiquetaId" = CE."Id"