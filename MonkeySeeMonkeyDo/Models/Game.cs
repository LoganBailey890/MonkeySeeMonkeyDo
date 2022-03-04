using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;


namespace MonkeySeeMonkeyDo.Models
{
    public class Game
    {
        [Required]
        public int? Id { get; set; }

        [MaxLength(150)]
        public String Name { get; set; }
    }
}
