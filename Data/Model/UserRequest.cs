using ESAP.Sirecec.Data.Identity;

namespace ESAP.Sirecec.Data.Model
{

	public partial class UserRequestModel : AuthUser
	{
		public int RoleId { get; set; }
		public string? Password { get; set; }
		public string? Code { get; set; }
	}
}