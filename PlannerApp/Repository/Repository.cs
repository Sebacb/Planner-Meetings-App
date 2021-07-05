using Microsoft.EntityFrameworkCore;
using PlannerApp.Data;
using PlannerApp.Models.Generic;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PlannerApp.Repository
{
    public class Repository<T> : IRepository<T> where T : Entity
    {
        protected readonly ApplicationDbContext _context;
        private DbSet<T> _entities;

        public Repository(ApplicationDbContext context)
        {
            this._context = context;
            _entities = context.Set<T>();
        }

        public virtual IQueryable<T> Query(bool eager = false)
        {
            var query = _entities.AsQueryable();
            if (eager)
            {
                var navigations = _context.Model.FindEntityType(typeof(T))
                    .GetDerivedTypesInclusive()
                    .SelectMany(type => type.GetNavigations())
                    .Distinct();

                foreach (var property in navigations)
                    query = query.Include(property.Name);
            }
            return query;
        }

        public IEnumerable<T> GetAll()
        {
            return Query(true).AsEnumerable();
        }

        public T GetById(int id)
        {
            return Query(true).SingleOrDefault(s => s.Id == id);
        }

        public void Insert(T entity)
        {
            if (entity == null) throw new ArgumentNullException("entity");

            _entities.Add(entity);
            _context.SaveChanges();
        }

        public void Update(T entity)
        {
            if (entity == null) throw new ArgumentNullException("entity");
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            T entity = _entities.SingleOrDefault(s => s.Id == id);
            _entities.Remove(entity);
            _context.SaveChanges();
        }

        public T FindBy(Func<T, bool> predicate)
        {
            return Query(true).SingleOrDefault(predicate);
        }

        public T FindFirstBy(Func<T, bool> predicate)
        {
            return Query(true).FirstOrDefault(predicate);
        }

        public IEnumerable<T> GetAllBy(Func<T, bool> predicate)
        {
            return Query(true).Where(predicate).ToList();
        }
    }
}
