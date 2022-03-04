using Microsoft.EntityFrameworkCore;
using MonkeySeeMonkeyDo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Query;

namespace MonkeySeeMonkeyDo.Services
{
    public class UserAccountDAL : IDataAccesLayer
    {
        private UserAccount _db;
        public UserAccountDAL(UserAccount userAccount)
        {
            _db = userAccount;
        }

        public List<Game> GetAllGames()
        {
            return _db.Games.ToList();
               
        }

        public Game GetGame(int gameId)
        {
            return _db.Games
                .Where(g => g.Id == gameId)
                .FirstOrDefault();
        }

        public PlayerHighScore GetGameHighScore(int gameId)
        {
            return _db.PlayerHighScores
                .Where(g => g.GameId == gameId)
                .Include(g => g.Game)
                .FirstOrDefault();
        }

        public List<PlayerHighScore> GetPlayerHighScores(String highScoreName)
        {
            //this gets email of logged in user, could be used for high score
            // String email = User.FindFirstValue(ClaimTypes.Email);
        
            return _db.PlayerHighScores
                .Where(g => g.HighScoreName == highScoreName)
                .Include(g => g.Game)
                .ToList();
        }

        public void SetHighScore(PlayerHighScore highScore)
        {
            PlayerHighScore existingHighScore = GetGameHighScore(highScore.GameId);

            if(existingHighScore != null)
            {
                _db.PlayerHighScores.Update(highScore);
                _db.SaveChanges();
            } else
            {
                highScore.Id = null;
                _db.PlayerHighScores.Add(highScore);
            }
        }
    }
}
