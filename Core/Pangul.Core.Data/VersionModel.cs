using System;
using Microsoft.EntityFrameworkCore;

namespace Pangul.Core.Data
{
    public abstract class VersionModel
    {
        /// <summary>
        /// This is not necessarily a `rowversion` column type in sqlserver;
        /// it is a generic field to use for concurrency checks.
        /// </summary>
        public byte[] RowVersion { get; set; }

        public static void BuildVersionModel<T>(ModelBuilder modelBuilder) where T : VersionModel
        {
            modelBuilder.Entity<T>()
                .Property(i => i.RowVersion)
                .IsConcurrencyToken();
        }
    }
}