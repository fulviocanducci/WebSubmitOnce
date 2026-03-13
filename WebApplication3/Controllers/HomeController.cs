using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Index(IFormCollection form)
        {
            return RedirectToAction(nameof(Index));
        }


        [HttpGet]
        public IActionResult GetTags(string term)
        {
            var data = new List <Item>
            {
                new Item( 3, "Famoso"),
                new Item( 4, "Item" ),
                new Item( 5, "Fabr" ),
                new Item( 6, "Itsou" )
            };
            return Json(data.Where(c => c.Text.Contains(term)));
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }

    class Item
    {
        public Item(int id, string text)
        {
            Id = id;
            Text = text;
        }

        public int Id { get; set; }
        public string Text { get; set; }
    }
}
