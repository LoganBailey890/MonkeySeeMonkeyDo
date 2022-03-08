using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MonkeySeeMonkeyDo.Models
{
    public class PlayerHighScore
    {
        [Required]
        public int? Id { get; set; }

        public Game Game { get; set; }

        public float HighScore { get; set; }


        public PlayerHighScore() { }

        public PlayerHighScore (Game game, float highScore)
        {
            this.Game = game;
            this.HighScore = highScore;
        }

        public PlayerHighScore(int id, Game game, float highScore)
        {
            this.Id = id;
            this.Game = game;
            this.HighScore = highScore;

        }
    }
}
