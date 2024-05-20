using Poli.Repositorio.Data.Core;

namespace Poli.Repositorio.Data.Model
{

	public partial class FileModel
	{
		public string? Url { get; set; } = null;
		public string? Key { get; set; } = null;
		public string? Name { get; set; } = null;
		public DateTime? DateModified { get; set; } = null;
		public bool IsDirectory { get; set; } = false;
		public string? Size { get; set; } = null;
		public decimal Length { get; set; } = 0;
		public bool HasSubDirectories { get; set; } = false;
	}

	public partial class FileManagerModel
	{
		public bool Success { get; set; } = true;
		public decimal? errorCode { get; set; } = null;
		public string? errorText { get; set; } = null;
		public bool HasSubDirectories { get; set; } = false;
		public List<FileModel> Items { get; set; } = new List<FileModel>();
	}

}

