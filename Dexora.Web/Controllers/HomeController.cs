using Microsoft.AspNetCore.Mvc;
namespace Dexora.Web.Controllers;
public class HomeController : Controller
{
    public IActionResult Index() => View();
}
