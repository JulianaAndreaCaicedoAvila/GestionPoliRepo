using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ESAP.Sirecec.Data.Migrations
{
    /// <inheritdoc />
    public partial class EntitiesUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BancoPrograma",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Nombre = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    FechaInicio = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BancoPrograma", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Curso",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    NucleoId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    DependenciaId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    TipoCursoId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    TipoAsistenciaId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    ProductoId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    IndicadorId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    TerritorialId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    MunicipioId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    ProgramaId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    EstadoCursoId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    CertificadoEtiquetaId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    CupoTotal = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    CupoAula = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    Nombre = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Descripcion = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CodigoVerificacion = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Responsable = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CorreoElectronico = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    TelefonoContacto = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    HorasTotales = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    NumeroDias = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    PorcentajeValidoAsistencia = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    CantidadAulas = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    LugarRealizacion = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    FechaInicioInscripcion = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    FechaFinInscripcion = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    FechaInicio = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    FechaFin = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    HoraInicio = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    Publicado = table.Column<bool>(type: "NUMBER(1)", nullable: true),
                    JornadaManana = table.Column<bool>(type: "NUMBER(1)", nullable: true),
                    JornadaTarde = table.Column<bool>(type: "NUMBER(1)", nullable: true),
                    JornadaNoche = table.Column<bool>(type: "NUMBER(1)", nullable: true),
                    Objetivos = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Contenidos = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    ImagenCertificado = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    ImagenCurso = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CertificadoCiudad = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CertificadoVerCiudad = table.Column<bool>(type: "NUMBER(1)", nullable: true),
                    CertificadoFechaExpedicion = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Curso", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Documento",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    TipoId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    ClasificacionId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    GrupoId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    Nombre = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Descripcion = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Archivo = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Documento", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Encuesta",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    TipoEncuestaId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    Titulo = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Descripcion = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Encuesta", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Indicador",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    ObjetivoId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    Nombre = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Descripcion = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Indicador", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Indicador_Clasificador_Obj~",
                        column: x => x.ObjetivoId,
                        principalTable: "Clasificador",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Modulo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Nombre = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Descripcion = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Justificacion = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Metodologia = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    ActividadAprendizaje = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    ActividadEvaluacion = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Objetivos = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Modulo", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Participante",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    TipoDocumentoId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    MunicipioId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    NivelEscolarId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    EstadoCivilId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    EntidadId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    GeneroId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    VulnerabilidadId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    DiscapacidadId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    CaracterísticaEsapId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    CargoId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    GrupoEtnicoId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    TipoServidorPublicoId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    TipoParticipanteId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    DocumentoNumero = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Nombres = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Apellidos = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    FechaNacimiento = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: true),
                    Profesion = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Telefono = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Celular = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Correo = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Direccion = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Contratista = table.Column<bool>(type: "NUMBER(1)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Participante", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Pregunta",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    TipoEncuestaId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    Titulo = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Descripcion = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pregunta", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Producto",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    DependenciaId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    Nombre = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Descripcion = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Producto", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Producto_Clasificador_Depe~",
                        column: x => x.DependenciaId,
                        principalTable: "Clasificador",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ValorGeneral",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Nombre = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    Codigo = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    Tipo = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ValorGeneral", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Nucleo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    BancoId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    Nombre = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    FechaInicio = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Nucleo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Nucleo_BancoPrograma_Banco~",
                        column: x => x.BancoId,
                        principalTable: "BancoPrograma",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CursoAnexo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    CursoId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    TipoId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    AnexoId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CursoAnexo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CursoAnexo_Curso_CursoId",
                        column: x => x.CursoId,
                        principalTable: "Curso",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CursoEncuesta",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    CursoId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    EncuestaId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CursoEncuesta", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CursoEncuesta_Curso_CursoId",
                        column: x => x.CursoId,
                        principalTable: "Curso",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CursoFecha",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    CursoId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    Ponderacion = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CursoFecha", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CursoFecha_Curso_CursoId",
                        column: x => x.CursoId,
                        principalTable: "Curso",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tema",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    DependenciaId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    ModuloId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    Nombre = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CursoId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tema", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tema_Clasificador_Dependen~",
                        column: x => x.DependenciaId,
                        principalTable: "Clasificador",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tema_Curso_CursoId",
                        column: x => x.CursoId,
                        principalTable: "Curso",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Tema_Modulo_ModuloId",
                        column: x => x.ModuloId,
                        principalTable: "Modulo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EncuestaPregunta",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    EncuestaId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    PreguntaId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EncuestaPregunta", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EncuestaPregunta_Encuesta_~",
                        column: x => x.EncuestaId,
                        principalTable: "Encuesta",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EncuestaPregunta_Pregunta_~",
                        column: x => x.PreguntaId,
                        principalTable: "Pregunta",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Programa",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    NucleoId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    Nombre = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    FechaInicio = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Programa", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Programa_Nucleo_NucleoId",
                        column: x => x.NucleoId,
                        principalTable: "Nucleo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CursoTema",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    CursoId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    TemaId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    DocenteId = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    LugarRealizacion = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    DireccionRealizacion = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true),
                    CreadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    EditadoEl = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Activo = table.Column<bool>(type: "NUMBER(1)", nullable: true, defaultValueSql: "((1))"),
                    CreadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    EditadoPor = table.Column<int>(type: "NUMBER(10)", nullable: true, defaultValueSql: "((1))"),
                    Orden = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CursoTema", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CursoTema_Curso_CursoId",
                        column: x => x.CursoId,
                        principalTable: "Curso",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CursoTema_Tema_TemaId",
                        column: x => x.TemaId,
                        principalTable: "Tema",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CursoAnexo_CursoId",
                table: "CursoAnexo",
                column: "CursoId");

            migrationBuilder.CreateIndex(
                name: "IX_CursoEncuesta_CursoId",
                table: "CursoEncuesta",
                column: "CursoId");

            migrationBuilder.CreateIndex(
                name: "IX_CursoFecha_CursoId",
                table: "CursoFecha",
                column: "CursoId");

            migrationBuilder.CreateIndex(
                name: "IX_CursoTema_CursoId",
                table: "CursoTema",
                column: "CursoId");

            migrationBuilder.CreateIndex(
                name: "IX_CursoTema_TemaId",
                table: "CursoTema",
                column: "TemaId");

            migrationBuilder.CreateIndex(
                name: "IX_EncuestaPregunta_EncuestaId",
                table: "EncuestaPregunta",
                column: "EncuestaId");

            migrationBuilder.CreateIndex(
                name: "IX_EncuestaPregunta_PreguntaId",
                table: "EncuestaPregunta",
                column: "PreguntaId");

            migrationBuilder.CreateIndex(
                name: "IX_Indicador_ObjetivoId",
                table: "Indicador",
                column: "ObjetivoId");

            migrationBuilder.CreateIndex(
                name: "IX_Nucleo_BancoId",
                table: "Nucleo",
                column: "BancoId");

            migrationBuilder.CreateIndex(
                name: "IX_Producto_DependenciaId",
                table: "Producto",
                column: "DependenciaId");

            migrationBuilder.CreateIndex(
                name: "IX_Programa_NucleoId",
                table: "Programa",
                column: "NucleoId");

            migrationBuilder.CreateIndex(
                name: "IX_Tema_CursoId",
                table: "Tema",
                column: "CursoId");

            migrationBuilder.CreateIndex(
                name: "IX_Tema_DependenciaId",
                table: "Tema",
                column: "DependenciaId");

            migrationBuilder.CreateIndex(
                name: "IX_Tema_ModuloId",
                table: "Tema",
                column: "ModuloId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CursoAnexo");

            migrationBuilder.DropTable(
                name: "CursoEncuesta");

            migrationBuilder.DropTable(
                name: "CursoFecha");

            migrationBuilder.DropTable(
                name: "CursoTema");

            migrationBuilder.DropTable(
                name: "Documento");

            migrationBuilder.DropTable(
                name: "EncuestaPregunta");

            migrationBuilder.DropTable(
                name: "Indicador");

            migrationBuilder.DropTable(
                name: "Participante");

            migrationBuilder.DropTable(
                name: "Producto");

            migrationBuilder.DropTable(
                name: "Programa");

            migrationBuilder.DropTable(
                name: "ValorGeneral");

            migrationBuilder.DropTable(
                name: "Tema");

            migrationBuilder.DropTable(
                name: "Encuesta");

            migrationBuilder.DropTable(
                name: "Pregunta");

            migrationBuilder.DropTable(
                name: "Nucleo");

            migrationBuilder.DropTable(
                name: "Curso");

            migrationBuilder.DropTable(
                name: "Modulo");

            migrationBuilder.DropTable(
                name: "BancoPrograma");
        }
    }
}
