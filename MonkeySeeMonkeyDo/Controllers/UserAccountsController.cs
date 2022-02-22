using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MonkeySeeMonkeyDo.Services;

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
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: UserAccountsController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: UserAccountsController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: UserAccountsController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: UserAccountsController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
