using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Poli.Repositorio.Data.Core
{
  public partial class GraficaEncuestaGeneral : BaseEntity
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public int BancoId { get; set; }
    public string? Nombre { get; set; }
    public DateTime FechaInicio { get; set; }
    public DateTime FechaFinal { get; set; }
    public virtual ClasificadorTipo? ClasificadorTipo { get; set; }
    public virtual List<Curso>? Cursos { get; set; }
    public virtual string? Docentes { get; set; }
  }
}