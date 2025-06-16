namespace post_it.Models;

public class Account : Profile
{
  // NOTE inheritance!
  // public string Id { get; set; }
  // public string Name { get; set; }
  // public string Picture { get; set; }
  public string Email { get; set; }
}

public class Profile
{
  public string Id { get; set; }
  public DateTime CreatedAt { get; set; }
  public DateTime UpdatedAt { get; set; }
  public string Name { get; set; }
  public string Picture { get; set; }

}