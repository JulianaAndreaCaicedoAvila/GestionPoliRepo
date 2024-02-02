CREATE OR REPLACE VIEW "CursosUsuarios" AS
SELECT
CU."Id",
CU."CursoId",
C."Nombre" AS "CursoNombre",
C."Activo" AS "CursoActivo",
C."EstadoCursoId" AS "CursoEstadoId",
C."EstadoCursoNombre" AS "CursoEstadoNombre",
C."Publicado" AS "CursoPublicado",
C."ImagenCertificado" AS "CursoImagenCertificado",
C."ImagenCurso" AS "CursoImagen",
C."CertificadoCiudad" AS "CursoCertificadoCiudad",
C."CertificadoVerCiudad" AS "CursoCertificadoCiudadVer",
C."CertificadoFechaExpedicion" AS "CursoCertificadoFechaExpedicion",
CU."UsuarioId",
U."FirstName",
U."LastName",
U."Name",
U."IsActive",
U."RoleId",
U."RoleName"
FROM "Cursos" C
RIGHT OUTER JOIN "CursoUsuario" CU
ON C."Id" = CU."CursoId"
LEFT OUTER JOIN "Usuarios" U
ON CU."UsuarioId" = U."Id"