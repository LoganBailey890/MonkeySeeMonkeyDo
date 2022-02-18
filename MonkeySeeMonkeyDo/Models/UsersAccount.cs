using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace MonkeySeeMonkeyDo.Models
{
    public class UsersAccount
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("UserName")]
        [Required]
        public string UserName { get; set; }

        [BsonElement("Password")]
        [Required]
        public string Password { get; set; }

        

    }
}
