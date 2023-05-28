CREATE VIEW "Clasificadores"
AS
SELECT
	P."TipoId" AS "PadreTipoID",
	PT."Nombre" AS "PadreTipoNombre",
	C."PadreId",
	P."Nombre" AS "PadreNombre",
	C."TipoId",
	T."Nombre" AS "TipoNombre",
	C."Id",
	C."Nombre",
	C."Descripcion",
	C."Orden",
	(SELECT COUNT(*) FROM "Clasificador" WHERE "PadreId" = C."Id") AS "Hijos",
	C."Activo",
	C."CreadoEl",
	C."CreadoPor",
	C."EditadoEl",
	C."EditadoPor"
FROM
	"Clasificador" C
	LEFT OUTER JOIN "ClasificadorTipo" T
	ON C."TipoId" = T."Id"
	LEFT OUTER JOIN "Clasificador" P
	ON C."PadreId" = P."Id"
	LEFT OUTER JOIN "ClasificadorTipo" PT
	ON PT."Id" = P."TipoId";