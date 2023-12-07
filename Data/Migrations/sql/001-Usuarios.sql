CREATE OR REPLACE VIEW "Usuarios" AS
SELECT
UR."RoleId",
RO."Name" AS "RoleName",
U."Id",
U."FirstName",
U."LastName",
U."FirstName" || ' ' || U."LastName" AS "Name",
U."IsActive",
U."CompanyId",
CO."Nombre" AS "CompanyName",
U."DependenceId",
DE."Nombre" AS "DependenceName",
U."TerritorialId",
TE."Nombre" AS "TerritorialName",
U."ProjectId",
PR."Nombre" AS "ProjectName",
U."UserName",
U."NormalizedUserName",
U."Email",
U."NormalizedEmail",
U."EmailConfirmed",
U."PasswordHash",
U."SecurityStamp",
U."ConcurrencyStamp",
U."PhoneNumber",
U."PhoneNumberConfirmed",
U."TwoFactorEnabled",
U."LockoutEnd",
U."LockoutEnabled",
U."AccessFailedCount"
FROM "AuthUsers" U
LEFT OUTER JOIN "Clasificador" CO
ON U."CompanyId" = CO."Id"
LEFT OUTER JOIN "Clasificador" DE
ON U."DependenceId" = DE."Id"
LEFT OUTER JOIN "Clasificador" TE
ON U."TerritorialId" = TE."Id"
LEFT OUTER JOIN "Clasificador" PR
ON U."ProjectId" = PR."Id"
LEFT OUTER JOIN "AuthUserRoles" UR
ON UR."UserId" = U."Id"
LEFT OUTER JOIN "AuthRoles" RO
ON UR."RoleId" = RO."Id"