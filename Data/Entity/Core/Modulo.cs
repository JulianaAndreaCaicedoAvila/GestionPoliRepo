﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Poli.Repositorio.Data.Core
{
	public partial class Modulo : BaseEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public string? Nombre { get; set; }
		public string? Descripcion { get; set; }
		public string? Justificacion { get; set; }
		public string? Metodologia { get; set; }
		public string? ActividadAprendizaje { get; set; }
		public string? ActividadEvaluacion { get; set; }
		public string? Objetivos { get; set; }
	}
}