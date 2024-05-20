using Poli.Repositorio.Data.Core;
using Poli.Repositorio.Data.Identity;

namespace Poli.Repositorio.Data.Model {
	interface IUserRegister {
		UserRequestModel usuario { get; set; }
		// Participante participante { get; set; }
	}

	public partial class UserRegisterModel : IUserRegister {
		public UserRequestModel? usuario { get; set; }
		// public Participante? participante { get; set; }
	}
}