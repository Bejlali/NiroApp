using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("AppOptions")]
    public class AppOption
    {
        public int Id { get; set; }
        public string OptionId { get; set; }
        public string Name { get; set; }
        public string OptionValue { get; set; }
        //general fields
        public string Parent_Id { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public string External_id { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }       
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime LastModified { get; set; } = DateTime.UtcNow;
    }
}