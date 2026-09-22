using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Data.SqlClient;
using TicketTracker.Api.Data;
using System.Text;

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

var jwtKey = builder.Configuration["Jwt:Key"];
if (string.IsNullOrEmpty(jwtKey))
{
    throw new InvalidOperationException(
        "No JWT signing key. Set Jwt__Key in the repo-root .env file for a "
        + "local run, or in the api service's environment for Docker.");
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString.ConnectionString));

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>();

// Tokens must carry our issuer and audience, be unexpired, and bear a
// signature we can reproduce with the key above. Any failure yields a 401.
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
    };
});

builder.Services.AddAuthorization();

// set controller urls to lowercase
builder.Services.AddControllers();
builder.Services.Configure<RouteOptions>(options =>
{
    options.LowercaseUrls = true;
});


// CORS allows us to send api requests between different ports/origins
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
        policy.WithOrigins("https://localhost:5173")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "TicketTracker API v1");
        options.RoutePrefix = "swagger";
    });
}

// middleware execution
app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.UseAuthentication();       // "Who are you?"   - reads the token, sets HttpContext.User
app.UseAuthorization();        // "May you?"       - enforces [Authorize] rules
app.MapControllers();

app.Run();