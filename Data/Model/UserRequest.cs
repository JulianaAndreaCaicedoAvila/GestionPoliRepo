using SongStock.Data.Identity;

namespace SongStock.Data.Model
{

	public partial class UserRequestModel : AuthUser
	{
		public int RoleId { get; set; }
		public string? Password { get; set; }
		public string? Code { get; set; }
		public bool GenerateConfirmation { get; set; } = false;
	}
}