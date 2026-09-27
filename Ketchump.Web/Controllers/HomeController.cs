using Microsoft.AspNetCore.Mvc;
namespace Ketchump.Web.Controllers;
public class HomeController : Controller
{
    public IActionResult Index() => View();
}
