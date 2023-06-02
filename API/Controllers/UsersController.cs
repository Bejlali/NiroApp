using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using API.Interfaces;

namespace API.Controllers
{
    [Authorize]
   /*[ApiController]
    [Route("api/[controller]")]  // /api/user ===> UserController ==>api/user*/
    public class UsersController : BaseApiController
    {
       // private readonly DataContext _context;
        //public UsersController(DataContext context)
            //_context = context;
        private readonly IUserRepository _userRepository;
        public UsersController( IUserRepository userRepository)
        {
            _userRepository = userRepository;
            
        }

       //[AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
           return Ok(await _userRepository.GetUsersAsync());
            
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<AppUser>> GetUser(string username)
        {
/*             var user = await _context.Users.FindAsync(id); // or return _context.Users.Find(id); 
            return user; */
                //return await _context.Users.FindAsync(id);
            return await _userRepository.GetUserByUsernameAsync(username);
                

        }

    }
}