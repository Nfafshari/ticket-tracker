using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Text;
using System.ComponentModel;

namespace TicketTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly IConfiguration _config;

    public AuthController(UserManager<IdentityUser> userManager, IConfiguration config)
    {
        _userManager = userManager;
        _config = config;
    }

    public record RegisterRequest(
        [property: Required, EmailAddress]
        string Email,

        [property: Required, MinLength(8)]
        string Password
    );

    public record LoginRequest(
        [property: Required, EmailAddress]
        string Email,

        [property: Required, MinLength(8)]
        string Password
    );

    /// <summary>
    /// Creates a secure JWT token for the authenticated user
    /// </summary>
    /// <param name="user"></param>
    /// <returns>a JWS token</returns>
    private string GenerateJwtToken(IdentityUser user)
    {
        // set our email and user id claims
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id),
            new Claim(JwtRegisteredClaimNames.Email, user.Email!),
        };

        // sign our jwt
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

        // generate the token
        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    /// <summary>
    /// Register function which creates a new user when the sign up
    /// </summary>
    /// <param name="request">Email and Password to be set</param>
    /// <returns>400 BadRequest if registration fails, 200 Ok response if succeeded</returns>
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var user = new IdentityUser { UserName = request.Email, Email = request.Email };
        var result = await _userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return Ok(new { message = "User created successfully" });
    }

    /// <summary>
    /// Login function which compares the user's email and checks their password,
    /// Generates a JWT token upon success
    /// </summary>
    /// <param name="request">Email and Password to be authn</param>
    /// <returns>401 Unauthorized if credentials are invalid, 200 Ok if succeeded and token</returns>
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        // find users email
        var user = await _userManager.FindByEmailAsync(request.Email);

        // Check if email was found or if user was found and their password is correct
        if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
        {
            return Unauthorized(new { message = "Invalid credentials" });
        }

        // generate a token
        var token = GenerateJwtToken(user);
        return Ok(new { token });
    }
}