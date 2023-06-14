namespace API.Entities
{
    public class AppOptions
    {
        public int Id { get; set; }
        public string OptionId { get; set; }
        public string OptionName { get; set; }
        public string GroupId { get; set; }
        public string Type { get; set; }
        public string Parent_Id { get; set; }
        public string Status { get; set; }
        public string External_id { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime LastActive { get; set; } = DateTime.UtcNow;
    }
}