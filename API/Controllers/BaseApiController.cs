using API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [ApiController]
    [Route("api/[controller]")]  // /api/user ===> UserController ==>api/user

    public class BaseApiController : ControllerBase
    {

    }
}