using Microsoft.EntityFrameworkCore;
using MonkeySeeMonkeyDo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonkeySeeMonkeyDo.Services
{
    public class UserAccount : DbContext
    {
        public UserAccount(DbContextOptions options) : base(options)
        {

        }
            
        public DbSet<PlayerHighScore> PlayerHighScores { get; set; }

        public DbSet<Game> Games { get; set; }
    }
}
