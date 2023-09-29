﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core
{
	public partial class Indicador : BaseEntity
	{

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public int? ProductoId { get; set; }
		public string? Nombre { get; set; }
		public string? Descripcion { get; set; }
		public virtual Producto? Producto { get; set; }
		public virtual List<Nucleo>? Nucleos { get; set; }
	}
}