using API.Extensions;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public DateOnly DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime LastActive { get; set; } = DateTime.UtcNow;
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public List<Photo> Photos { get; set; } = new();

        public List<UserLike> LikedByUsers { get; set; }
        public List<UserLike> LikedUsers { get; set; }

        public List<Message> MessagesSent { get; set; }
        public List<Message> MessagesReceived { get; set; }

        public ICollection<AppUserRole> UserRoles { get; set; }

        //my fields//---
        public string FName { get; set; }
        public string LName { get; set; }
        public string Profile { get; set; }
        public string Department { get; set; }
        public string Extension { get; set; }
        public string Address { get; set; }
        public string Groups { get; set; }
        //General Fields
        public string Status { get; set; }
        public string Type { get; set; }
        public string External_id { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime LastModified { get; set; } = DateTime.UtcNow;

    }
}