CREATE VIEW "Usuarios"
AS
SELECT
	UR."RoleId",
	R."Name" AS "RoleName",
	U."CompanyId",
	C."Nombre" AS "CompanyName",
	C."Descripcion" AS "CompanyAcronym",
	U."DependenceId",
	D."Nombre" AS "DependenceName",
	U."Id",
  U."FirstName" || ' ' || U."LastName" AS "Name",
	U."FirstName",
	U."LastName",
	U."Email",
	U."UserName",
	U."EmailConfirmed",
	U."PasswordHash",
	U."SecurityStamp",
	U."PhoneNumber",
	U."PhoneNumberConfirmed",
	U."TwoFactorEnabled",
	U."LockoutEnd",
	U."LockoutEnabled",
	U."AccessFailedCount",
	U."ConcurrencyStamp",
	U."NormalizedEmail",
	U."NormalizedUserName",
	U."IsActive"
FROM
	"Clasificador" D RIGHT OUTER JOIN
	"AuthUsers" U ON D."Id" = U."DependenceId" LEFT OUTER JOIN
	"Clasificador" C ON U."CompanyId" = C."Id" LEFT OUTER JOIN
	"AuthRoles" R RIGHT OUTER JOIN
	"AuthUserRoles" UR ON R."Id" = UR."RoleId" ON U."Id" = UR."UserId";