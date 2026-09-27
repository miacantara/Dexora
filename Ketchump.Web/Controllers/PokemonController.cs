using Microsoft.AspNetCore.Mvc;
using Ketchump.Web.Services;
namespace Ketchump.Web.Controllers;
[ApiController]
[Route("api/pokemon")]
[ResponseCache(Duration = 3600, Location = ResponseCacheLocation.Any)]
public class PokemonController(PokeApiService service) : ControllerBase
{
    [HttpGet("list")]
    public async Task<IActionResult> List([FromQuery]int limit=151) => Ok(await service.GetPokemonListAsync(Math.Clamp(limit,1,1025)));
    [HttpGet("{id}")]
    public async Task<IActionResult> Detail(string id) => Ok(await service.GetPokemonDetailAsync(id));
    [HttpGet("type/{name}")]
    public async Task<IActionResult> Type(string name) => Ok(await service.GetTypeAsync(name));
}
