namespace API.Helpers
{
    public class UserParams : PaginationParams
    {
     
        public string CurrentUsername { get; set; }
        public string Gender { get; set; }
        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 100;
        public string Status { get; set; } = "Active";
        public string Groups { get; set; } = "Team";
        public string Type { get; set; } = "Employee";
        public string OrderBy { get; set; } = "lastActive";

    }
}