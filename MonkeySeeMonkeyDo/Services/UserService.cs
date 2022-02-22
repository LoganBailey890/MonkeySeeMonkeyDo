using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using MonkeySeeMonkeyDo.Models;

namespace MonkeySeeMonkeyDo.Services
{
    public class UserService
    {
        private readonly IMongoCollection<UsersAccount> user;

        public UserService(IConfiguration config)
        {
            MongoClient client = new MongoClient(config.GetConnectionString("MonkeySeeMonkeyDoDB"));
            IMongoDatabase database = client.GetDatabase("MonkeySeeMonkeyDoDB");
            user = database.GetCollection<UsersAccount>("User");
        }

        public List<UsersAccount> Get()
        {
            return user.Find(user => true).ToList();
        }

        public UsersAccount Get(string id)
        {
            return user.Find(user => user.Id == id).FirstOrDefault();
        }

        public UsersAccount Create(UsersAccount account)
        {
            user.InsertOne(account);
            return account;
        }

        public void Update(string id, UsersAccount userIn)
        {
            user.ReplaceOne(user => user.Id == id, userIn);
            
        }

        public void Remove(UsersAccount usersAccount)
        {
            user.DeleteOne(user => user.Id == usersAccount.Id);
        }

        public void RemoveByID(string id)
        {
            user.DeleteOne(user => user.Id == id);
        }
    }
}
