using System.Linq.Expressions;

namespace Poli.Repositorio.Data
{
	public interface IGenericRepository<T> where T : class
	{
		Task<IReadOnlyList<T>> GetAll();
		Task<bool> Exists(int id);
		Task<T> Get(int id);
		Task<T> Add(T entity);
		Task Update(T entity);
		Task Delete(T entity);
		Task<IEnumerable<T>> Find(Expression<Func<T, bool>> predicate);
	}
}