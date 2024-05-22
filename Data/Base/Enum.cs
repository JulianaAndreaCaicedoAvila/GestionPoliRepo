namespace SongStock.Data.Enum {
	public enum EstadoCurso {
		Borrador = 421,
		Revision = 422,
		Aprobado = 423,
		Rechazado = 424,
		Iniciado = 441,
		Finalizado = 442
	}

	public enum Dependencia {
		Capacitacion = 13,
		AltoGobierno = 14
	}

	public enum Rol {
		Administrador = 1,
		PedagogoLider = 2,
		Pedagogo = 3,
		GestorTerritorial = 4,
		Docente = 5,
		Auditor = 6,
		Monitor = 7,
		Participante = 8
	}
}