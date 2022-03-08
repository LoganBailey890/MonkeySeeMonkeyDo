using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;


namespace MonkeySeeMonkeyDo.Models
{
    public class Game
    {
        [Required]
        public int Id { get; set; }

        [MaxLength(150)]
        public string Name { get; set; }


        public Game( int id, string name)
        {
            this.Id = id;
            this.Name = name;
        }

        public Game() { }  
    }
}
