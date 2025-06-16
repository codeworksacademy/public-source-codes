using System.ComponentModel.DataAnnotations;

namespace post_it.Models;

public class Picture
{
  public int Id { get; set; }
  public DateTime CreatedAt { get; set; }
  public DateTime UpdatedAt { get; set; }
  public int AlbumId { get; set; }
  public string CreatorId { get; set; }
  [MaxLength(1000), Url] public string ImgUrl { get; set; }
  public Profile Creator { get; set; }
}