var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();
builder.Services.AddResponseCompression(options => options.EnableForHttps = true);
builder.Services.AddHttpClient("PokeApi", client =>
{
    client.BaseAddress = new Uri("https://pokeapi.co/api/v2/");
    client.DefaultRequestHeaders.UserAgent.ParseAdd("Ketchump/1.0");
});
builder.Services.AddMemoryCache();
builder.Services.AddScoped<Ketchump.Web.Services.PokeApiService>();
var app = builder.Build();
if (!app.Environment.IsDevelopment()) app.UseExceptionHandler("/Home/Error");
app.UseHttpsRedirection();
app.UseResponseCompression();
app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = context =>
    {
        if (!app.Environment.IsDevelopment())
        {
            context.Context.Response.Headers.CacheControl = context.Context.Request.Query.ContainsKey("v")
                ? "public,max-age=31536000,immutable"
                : "public,max-age=3600";
        }
    }
});
app.UseRouting();
app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");
app.Run();