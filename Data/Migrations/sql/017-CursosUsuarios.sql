CREATE OR REPLACE VIEW "CursosUsuarios" AS
SELECT
CU."Id",
CU."CursoId",
C."Nombre" AS "CursoNombre",
C."Activo",
C."EstadoCursoId" AS "CursoEstadoId",
C."EstadoCursoNombre" AS "CursoEstadoNombre",
C."Publicado" AS "CursoPublicado",
C."ImagenCertificado" AS "CursoImagenCert",
C."ImagenCurso" AS "CursoImagen",
C."CertificadoCiudad" AS "CertCiudad",
C."CertificadoVerCiudad" AS "CertCiudadVer",
C."CertificadoFechaExpedicion" AS "CertFechaExpedicion",
CU."UsuarioId",
U."FirstName",
U."LastName",
U."Name",
U."Email",
U."IsActive",
U."RoleId",
U."RoleName"
FROM "Cursos" C
RIGHT OUTER JOIN "CursoUsuario" CU
ON C."Id" = CU."CursoId"
LEFT OUTER JOIN "Usuarios" U
ON CU."UsuarioId" = U."Id"