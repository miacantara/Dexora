using System.Text.Json;
using Microsoft.Extensions.Caching.Memory;
namespace Dexora.Web.Services;

public class PokeApiService(IHttpClientFactory factory, IMemoryCache cache)
{
    private readonly HttpClient _http = factory.CreateClient("PokeApi");
    private static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web);
    private async Task<JsonElement> Get(string path)
    {
        if (cache.TryGetValue(path, out JsonElement hit)) return hit;
        using var stream = await _http.GetStreamAsync(path);
        using var doc = await JsonDocument.ParseAsync(stream);
        var clone = doc.RootElement.Clone();
        cache.Set(path, clone, TimeSpan.FromHours(6));
        return clone;
    }
    public async Task<object> GetPokemonListAsync(int limit)
    {
        var listTask = Get($"pokemon?limit={limit}&offset=0");
        var formsTask = Get("pokemon?limit=5000&offset=1025");
        await Task.WhenAll(listTask, formsTask);
        var list = await listTask;
        var output = new List<object>();
        foreach (var x in list.GetProperty("results").EnumerateArray())
        {
            var name = x.GetProperty("name").GetString()!; var url = x.GetProperty("url").GetString()!;
            var id = int.Parse(url.TrimEnd('/').Split('/').Last());
            output.Add(new { id, name, image = $"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png" });
        }
        // Keep the national Pokédex list intact, then append every Mega form
        // exposed by PokeAPI (including X/Y and Legends: Z-A forms).
        var forms = await formsTask;
        foreach (var x in forms.GetProperty("results").EnumerateArray())
        {
            var name = x.GetProperty("name").GetString()!;
            if (!name.Contains("mega", StringComparison.OrdinalIgnoreCase)) continue;
            var url = x.GetProperty("url").GetString()!;
            var id = int.Parse(url.TrimEnd('/').Split('/').Last());
            output.Add(new { id, name, image = $"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png" });
        }
        return output;
    }
    public async Task<object> GetPokemonDetailAsync(string id)
    {
        var p = await Get($"pokemon/{id}");
        // Pokémon form IDs (including regional forms) do not necessarily match
        // their species IDs. Resolve the species through the Pokémon resource.
        var speciesName = p.GetProperty("species").GetProperty("name").GetString()!;
        var speciesTask = Get($"pokemon-species/{speciesName}");
        var evolutionTask = GetEvolutionAsync(speciesTask);
        var abilitiesTask = Task.WhenAll(p.GetProperty("abilities").EnumerateArray().Select(async slot =>
        {
            var abilityName = slot.GetProperty("ability").GetProperty("name").GetString()!;
            var ability = await Get($"ability/{abilityName}");
            var englishEffect = ability.GetProperty("effect_entries")
                .EnumerateArray()
                .FirstOrDefault(entry => entry.GetProperty("language").GetProperty("name").GetString() == "en");
            var description = englishEffect.ValueKind == JsonValueKind.Object
                ? englishEffect.GetProperty("short_effect").GetString()
                : null;
            if (string.IsNullOrWhiteSpace(description))
            {
                var englishFlavor = ability.GetProperty("flavor_text_entries")
                    .EnumerateArray()
                    .FirstOrDefault(entry => entry.GetProperty("language").GetProperty("name").GetString() == "en");
                description = englishFlavor.ValueKind == JsonValueKind.Object
                    ? englishFlavor.GetProperty("flavor_text").GetString()
                    : null;
            }
            description = string.IsNullOrWhiteSpace(description)
                ? "No description available."
                : description.Replace('\n', ' ').Replace('\f', ' ').Trim();
            return new
            {
                name = abilityName,
                is_hidden = slot.GetProperty("is_hidden").GetBoolean(),
                description
            };
        }));
        var typesTask = Task.WhenAll(p.GetProperty("types").EnumerateArray().Select(async t =>
        {
            var n = t.GetProperty("type").GetProperty("name").GetString()!;
            var td = await Get($"type/{n}");
            return new { name = n, relations = td.GetProperty("damage_relations") };
        }));
        await Task.WhenAll(speciesTask, evolutionTask, abilitiesTask, typesTask);
        return new { pokemon = p, species = await speciesTask, types = await typesTask, evolution = await evolutionTask, abilities = await abilitiesTask };
    }
    private async Task<object?> GetEvolutionAsync(Task<JsonElement> speciesTask)
    {
        var s = await speciesTask;
        object? evolution = null;
        if (s.TryGetProperty("evolution_chain", out var ec) && ec.ValueKind != JsonValueKind.Null)
        {
            var u = ec.GetProperty("url").GetString()!; var eid = u.TrimEnd('/').Split('/').Last(); evolution = await Get($"evolution-chain/{eid}");
        }
        return evolution;
    }
    public async Task<JsonElement> GetTypeAsync(string name) => await Get($"type/{name}");
}