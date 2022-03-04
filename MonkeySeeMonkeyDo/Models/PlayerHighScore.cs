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

        public String HighScoreName { get; set; }

        public int GameId { get; set; }

        public Game Game { get; set; }

        public float HighScore { get; set; }
    }
}
