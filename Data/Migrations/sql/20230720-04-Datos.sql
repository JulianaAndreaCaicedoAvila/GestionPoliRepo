
INSERT ALL
INTO "Clasificador"("Id","TipoId","PadreId","Nombre","Descripcion","Orden","CreadoPor","EditadoPor","Activo","CreadoEl","EditadoEl")
VALUES (1157, 3, 0, N'Cédula de Ciudadanía', NULL, 0, 1, 1, 1, SYSDATE, SYSDATE)
VALUES (1158, 3, 0, N'Cédula de Ciudadanía', NULL, 0, 1, 1, 1, SYSDATE, SYSDATE)
VALUES (1159, 3, 0, N'Cédula de Extranjería', NULL, 0, 1, 1, 1, SYSDATE, SYSDATE)
VALUES (1160, 3, 0, N'Pasaporte', NULL, 0, 1, 1, 1, SYSDATE, SYSDATE)
VALUES (1161, 4, 0, N'Masculino', NULL, 0, 1, 1, 1, SYSDATE, SYSDATE)
VALUES (1162, 4, 0, N'Femenino', NULL, 0, 1, 1, 1, SYSDATE, SYSDATE)
VALUES (1163, 4, 0, N'Intergénero', NULL, 0, 1, 1, 1, SYSDATE, SYSDATE)
VALUES (1164, 5, 0, N'Primaria', NULL, 0, 1, 1, 1, SYSDATE, SYSDATE)
VALUES (1165, 5, 0, N'Secundaria', NULL, 0, 1, 1, 1, SYSDATE, SYSDATE)
VALUES (1166, 5, 0, N'Primaria', NULL, 0, 1, 1, 1, SYSDATE, SYSDATE)
VALUES (1167, 5, 0, N'Primaria', NULL, 0, 1, 1, 1, SYSDATE, SYSDATE)
VALUES (1168, 5, 0, N'Primaria', NULL, 0, 1, 1, 1, SYSDATE, SYSDATE)
SELECT * FROM dual;

SELECT * FROM "ClasificadorTipo";
-- SELECT * FROM "ClasificadorTipo" WHERE "Nombre" LIKE '%gén%';
-- SELECT * FROM "Clasificador" ORDER BY "Id" DESC;
-- SELECT * FROM "Clasificadores" ORDER BY "Id" DESC;