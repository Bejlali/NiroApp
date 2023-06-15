namespace API.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string PhotoUrl { get; set; }
        public int Age { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public List<PhotoDto> Photos { get; set; }
        public string FName { get; set; }
        public string LName { get; set; }
        public string Email { get; set; }
        public string Profile { get; set; }
        public string Department { get; set; }
        public string Phone { get; set; }
        public string Extension { get; set; }
        public string Address { get; set; }
        public string Groups { get; set; }

        public string Parent_Id { get; set; }
        public string Status { get; set; }
        public string Type { get; set; }
        public string External_id { get; set; }
    }
}