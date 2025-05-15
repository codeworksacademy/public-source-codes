namespace froggy_finder_api.Models;

// NOTE backing class
public class Frog
{
  public int Id { get; set; }
  public string Name { get; set; }
  public string Color { get; set; }
  public int? Age { get; set; } // nullable OR defaults to null instead of 0
  public bool? IsSingle { get; set; } // nullable OR defaults to null instead of false
}