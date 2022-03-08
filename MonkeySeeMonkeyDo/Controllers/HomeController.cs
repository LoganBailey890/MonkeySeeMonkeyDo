using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MonkeySeeMonkeyDo.Models;
using MonkeySeeMonkeyDo.Services;
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

        Game MonkeyChain = new Game(1, "Monkey Chain");


        private readonly ILogger<HomeController> _logger;

        private IDataAccesLayer dal;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
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

            List<PlayerHighScore> temp = new List<PlayerHighScore>();

            PlayerHighScore player1 = new PlayerHighScore(1, MonkeyChain, 450);

            temp.Add(player1);

            PlayerHighScore player2 = new PlayerHighScore(2, MonkeyChain, 590);

            temp.Add(player2);

            PlayerHighScore player3 = new PlayerHighScore(3, MonkeyChain, 800);

            temp.Add(player3);




            ViewBag.scoreInput = 0;

            ViewBag.highScoreList = temp;



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

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

      /*  [HttpPost]
        public ActionResult Submit(int scoreIN)
        {
            PlayerHighScore temp = new PlayerHighScore(, MonkeyChain, scoreIN);

            String id = 

                dal._

            dal.SetHighScore(temp);

            return new EmptyResult();
        }*/
    }
}
