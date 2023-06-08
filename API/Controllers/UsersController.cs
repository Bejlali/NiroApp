using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


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
        private readonly IMapper _mapper;
        public UsersController( IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            
        }

       //[AllowAnonymous]
        [HttpGet]
        //public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
           var users = await _userRepository.GetMembersAsync();
           //var usersToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);
           // return Ok(usersToReturn);
           return Ok(users);
        }

        [HttpGet("{username}")]
        //public async Task<ActionResult<AppUser>> GetUser(string username)
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
/*          var user = await _context.Users.FindAsync(id); // or return _context.Users.Find(id); 
            return user; */
            //return await _context.Users.FindAsync(id);
            //return await _userRepository.GetUserByUsernameAsync(username);
            // var user =  await _userRepository.GetUserByUsernameAsync(username);
            // return _mapper.Map<MemberDto>(user);
           return await _userRepository.GetMemberAsync(username); 

        }
        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepository.GetUserByUsernameAsync(username);

            if (user == null) return NotFound();

            _mapper.Map(memberUpdateDto, user);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update user");
        }


    }
}