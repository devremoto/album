using System;

namespace Domain.Entities
{
    public class Entity
    {
        public virtual Guid Id { get; set; }
        public DateTime? AddedIn { get; set; }
        public DateTime? LastModified { get; set; }

    }
}