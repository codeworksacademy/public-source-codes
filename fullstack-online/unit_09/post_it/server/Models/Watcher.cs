namespace post_it.Models;

// NOTE backing class for the many-to-many
public class Watcher
{
  public int Id { get; set; }
  public string AccountId { get; set; }
  public int AlbumId { get; set; }
}

public class WatcherProfile : Profile
{
  // public string Name { get; set; }
  // public string Picture { get; set; }
  // public string Id { get; set; }
  public int WatcherId { get; set; }
  public int AlbumId { get; set; }
}

public class WatcherAlbum : Album
{
  public int WatcherId { get; set; }
  public string AccountId { get; set; }
}