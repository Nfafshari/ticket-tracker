using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using TicketTracker.Api.Data;

// Pull the repo-root .env into environment variables so local runs share the
// same password Docker Compose uses. In a container there is no .env file and
// Compose has already set the real environment variables.
DotNetEnv.Env.TraversePath().Load();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// The connection string in appsettings.json carries no password; it comes from
// MSSQL_PASSWORD so the secret never lands in a committed file. Compose sets the
// whole connection string itself, password included, so only fill it in if we
// actually have one.
var connectionString = new SqlConnectionStringBuilder(
    builder.Configuration.GetConnectionString("DefaultConnection"));

var dbPassword = builder.Configuration["MSSQL_PASSWORD"];
if (!string.IsNullOrEmpty(dbPassword))
{
    connectionString.Password = dbPassword;
}

if (string.IsNullOrEmpty(connectionString.Password))
{
    throw new InvalidOperationException(
        "No database password. Set MSSQL_PASSWORD in the repo-root .env file for a "
        + "local run, or in the api service's environment for Docker.");
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString.ConnectionString));

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
