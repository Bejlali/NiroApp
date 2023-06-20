namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public DateTime LastActive { get; set; } = DateTime.UtcNow;
        public List<Photo> Photos { get; set; } = new();    
        public List<UserLike> LikedByUsers { get; set; }
        public List<UserLike> LikedUsers { get; set; }
        //my fields//---
        public string FName { get; set; }
        public string LName { get; set; }
        public string Email { get; set; }
        public string Profile { get; set; }
        public string Role { get; set; }
        public string Department { get; set; }
        public string Phone { get; set; }
        public string Extension { get; set; }
        public string Address { get; set; }
        public string Groups { get; set; }
        //General Fields
        public string Parent_Id { get; set; }
        public string Status { get; set; }
        public string Type { get; set; }
        public string External_id { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime LastModified { get; set; } = DateTime.UtcNow;

    }
}