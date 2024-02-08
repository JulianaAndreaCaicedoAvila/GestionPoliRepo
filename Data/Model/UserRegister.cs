using ESAP.Sirecec.Data.Core;
using ESAP.Sirecec.Data.Identity;

namespace ESAP.Sirecec.Data.Model
{
	interface IUserRegister
	{
		UserRequestModel usuario { get; set; }
		Participante participante { get; set; }
	}

	public partial class UserRegisterModel : IUserRegister
	{
		public UserRequestModel? usuario { get; set; }
		public Participante? participante { get; set; }
	}
}