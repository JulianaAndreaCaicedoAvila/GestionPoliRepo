using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core
{
	public partial class ValorGeneral : BaseEntity
	{

		[Key]
		public int Id { get; set; }
		public string? Nombre { get; set; }
		public int Codigo { get; set; }
		public string? Tipo { get; set; }
	}
}