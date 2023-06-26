using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ESAP.Sirecec.Data.Core
{
	public partial class CursoDocente : BaseEntity
	{
		[Key]
		public int Id { get; set; }
		public string? NombreCurso { get; set; }

	}
}