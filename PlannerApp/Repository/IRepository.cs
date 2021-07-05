using PlannerApp.Models.Generic;
using System;
using System.Collections.Generic;

namespace PlannerApp.Repository
{
    public interface IRepository<T> where T : IEntity
    {
        IEnumerable<T> GetAll();
        IEnumerable<T> GetAllBy(Func<T, bool> predicate);
        T GetById(int id);
        T FindBy(Func<T, bool> predicate);
        T FindFirstBy(Func<T, bool> predicate);
        void Insert(T entity);
        void Update(T entity);
        void Delete(int id);
    }
}
