using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

// 202202071328: https://enlear.academy/repository-pattern-and-unit-of-work-with-asp-net-core-web-api-6802e1aa4f78

namespace ESAP.Sirecec.Data {
	public class GenericRepository<T> : IGenericRepository<T> where T : class {
		private readonly DataContext _db;
		internal DbSet<T> _dbSet;
		protected readonly ILogger _logger;

		public GenericRepository(DataContext db, ILogger logger) {
			_db = db;
			_dbSet = _db.Set<T>();
			_logger = logger;

		}

		public async Task<T> Add(T entity) {
			await _db.AddAsync(entity);
			await _db.SaveChangesAsync();
			return entity;
		}

		public async Task Delete(T entity) {
			_db.Set<T>().Remove(entity);
			await _db.SaveChangesAsync();
		}

		public async Task<bool> Exists(int id) {
			var entity = await Get(id);
			return entity != null;
		}

		public async Task<T> Get(int id) {
			return await _db.Set<T>().FindAsync(id);
		}

		public async Task Update(T entity) {
			_db.Entry(entity).State = EntityState.Modified;
			await _db.SaveChangesAsync();
		}

		public async Task<IReadOnlyList<T>> GetAll() {
			return await _db.Set<T>().ToListAsync();
		}

		public async Task<IEnumerable<T>> Find(Expression<Func<T, bool>> predicate) {
			return await _dbSet.Where(predicate).ToListAsync();
		}
	}
}
