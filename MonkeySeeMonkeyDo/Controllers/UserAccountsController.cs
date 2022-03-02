using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MonkeySeeMonkeyDo.Services;
using MonkeySeeMonkeyDo.Models;
using MongoDB.Bson;
using MongoDB.Driver.Linq;
using MongoDB.Driver;

namespace MonkeySeeMonkeyDo.Controllers
{
    public class UserAccountsController : Controller
    {
        private readonly UserService userService;

        public UserAccountsController(UserService userService)
        {
            this.userService = userService;
        }
        // GET: UserAccountsController
        public ActionResult Index()
        {
            return View(userService.Get());
        }

        // GET: UserAccountsController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: UserAccountsController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: UserAccountsController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(UsersAccount user)
        {
            if(ModelState.IsValid)
            {
                userService.Create(user);
                return RedirectToAction(nameof(Index));

            }
            return View(user);
        }

        // GET: UserAccountsController/Edit/5
        public ActionResult Edit(string id)
        {
            if(id == null)
            {
                return NotFound();
            }

            var user = userService.Get(id);
            if(user == null)
            {
                return NotFound();
            }
            return View(user);
        }

        // POST: UserAccountsController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(string id, UsersAccount users)
        {
            if (id != users.Id)
            {
                return NotFound();
            }
            if(ModelState.IsValid)
            {
                userService.Update(id, users);
                return RedirectToAction(nameof(Index));
            }
            else
            {
                return View(users);
            }
        }

        public ActionResult Login(string userName, string Password)
        {
            return View(userName, Password);
        }


        // GET: UserAccountsController/Delete/5
        public ActionResult Delete(string id)
        {
            if(id == null)
            {
                return NotFound();
            }

            var user = userService.Get(id);
            if (user == null) 
            {
                return NotFound();
            }

            return View(user);
        }

        // POST: UserAccountsController/Delete/5
        [HttpPost,ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(string id, IFormCollection collection)
        {
            try
            {
                var user = userService.Get(id);

                if(user == null)
                {
                    return NotFound();
                }
                userService.RemoveByID(user.Id);

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
