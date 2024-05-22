using SongStock.Data.Core;
using SongStock.Data.Identity;

namespace SongStock.Data.Model {
	interface IUserRegister {
		UserRequestModel usuario { get; set; }
		// Participante participante { get; set; }
	}

	public partial class UserRegisterModel : IUserRegister {
		public UserRequestModel? usuario { get; set; }
		// public Participante? participante { get; set; }
	}
}