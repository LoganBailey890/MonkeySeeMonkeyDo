using MonkeySeeMonkeyDo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonkeySeeMonkeyDo.Services
{
    interface IDataAccesLayer
    {
        List<PlayerHighScore> GetPlayerHighScores(String highScoreName);

        PlayerHighScore GetGameHighScore(int gameId);

        List<Game> GetAllGames();

        Game GetGame(int gameId);

        void SetHighScore(PlayerHighScore highScore);

        
    }
}
