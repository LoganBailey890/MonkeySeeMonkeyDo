using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MonkeySeeMonkeyDo.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;



namespace MonkeySeeMonkeyDo.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }
        public IActionResult Account()
        {
            return View();
        }

        public IActionResult BananaRun()
        {
            return View();
        }

        public IActionResult MatchGame()
        {
            return View();
        }

        public IActionResult MonkeySnake()
        {
            return View();
        }

        public IActionResult MonkeySwing()
        {
            return View();
        }

        public IActionResult TicTacToe()
        {
            return View();
        }

        public IActionResult Create()
        {
            
            return View("../UserAccounts/Create");
        }
/*        public ActionResult Create()
        {
            return this.RedirectToAction("Create", "UserAccountsController");
        }*/

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
