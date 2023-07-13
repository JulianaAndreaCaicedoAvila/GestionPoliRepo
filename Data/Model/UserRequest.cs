namespace ESAP.Sirecec.Data.Model
{

	public partial class UserRequest
	{
		public int Id { get; set; }
		public int RoleId { get; set; }
		public int? CompanyId { get; set; }
		public int? DependenceId { get; set; }
		public string? FirstName { get; set; }
		public string? LastName { get; set; }
		public string? Email { get; set; }
		public string? Password { get; set; }
		public string? Code { get; set; }
	}
}