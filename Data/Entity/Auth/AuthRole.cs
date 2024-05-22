
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace SongStock.Data.Identity
{
	public partial class AuthRole : IdentityRole<int>
	{
	}
}