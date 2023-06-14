namespace API.DTOs
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Token { get; set; }
        public string PhotoUrl{ get; set;}
         public string KnownAs { get; set; }
         public string Gender { get; set; }
        public string Status { get; set; }
        public string Type { get; set; }
        public string Groups { get; set; }

    }
}