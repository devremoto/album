using Application.Interfaces;
using Application.ViewModels.Common;
using Domain.Interfaces;
using Domain.Interfaces.Services;
using System;
using System.Linq;
using System.Linq.Expressions;
using CrossCutting.Extensions;

namespace Application.Services
{
    public partial class BaseAppService<T> : IBaseAppService<T>
        where T : class
    {
        private readonly IUnitOfWork _uow;
        protected IBaseService<T> _baseService;

        public BaseAppService(IBaseService<T> service, IUnitOfWork uow)
        {
            _uow = uow;
            _baseService = service;
        }

        public IQueryable<T> Find(Expression<Func<T, bool>> predicate, params string[] includeProperties)
        {
            var model = _baseService.Find(predicate, includeProperties);
            return model;
        }

        public T GetOne(params object[] keys)
        {
            var model = _baseService.GetOne(keys);
            return model;
        }

        public virtual IQueryable<T> GetAll(params string[] includeProperties)
        {
            var model = _baseService.GetAll(includeProperties);
            return model;
        }

        public virtual PagingViewModel<T> GetByAllPage(PagingViewModel<T> page, params string[] includeProperties)
        {
            var model = _baseService.GetAll(includeProperties).Paging(page.Number, page.Size, page.OrderBy, page.OrderDirection);

            page.List = model.Item1.ToList();
            page.TotalCount = model.Item2;
            return page;
        }

        public T Add(T model)
        {
            var result = _baseService.Add(model);
            _uow.Commit();
            return result;
        }

        public T Update(T model)
        {
            var result = _baseService.Update(model);
            _uow.Commit();
            return result;
        }

        public T Save(T model, bool edit)
        {
            T result;
            if (edit)
            {
                result = _baseService.Update(model);
            }
            else
            {
                result = _baseService.Add(model);
            }
            _uow.Commit();
            return result;
        }

        public virtual void Remove(T model)
        {
            _baseService.Remove(model);
            _uow.Commit();
        }

        public virtual void Remove(params object[] key)
        {
            _baseService.Remove(key);
            _uow.Commit();
        }

        public void Dispose()
        {
            //_uow.Dispose();
        }


    }

}
