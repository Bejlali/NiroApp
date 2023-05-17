using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class AppUser
    {
        [Key]
       public int Id { get; set; } 
       public string UserName { get; set; }
       public string FName { get; set; }
       public string LName { get; set; } 
       public string Email {get; set; }
       public string Profile {get; set; }
       public string Department {get; set; }
       public string Phone {get; set; }
       public string Address {get; set; }
       public byte[] PasswordHash{ get; set; }
       public byte[] PasswordSalt{ get; set; }

    }
}