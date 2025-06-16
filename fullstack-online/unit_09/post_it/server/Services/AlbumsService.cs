



namespace post_it.Services;

public class AlbumsService
{
  private readonly AlbumsRepository _repository;

  public AlbumsService(AlbumsRepository repository)
  {
    _repository = repository;
  }

  internal Album ArchiveAlbum(int albumId, Account userInfo)
  {
    Album album = GetAlbumById(albumId);

    if (album.CreatorId != userInfo.Id)
    {
      throw new Exception($"You cannot archive another user's album, {userInfo.Name}!!!");
    }

    album.Archived = !album.Archived;

    _repository.ArchiveAlbum(album);

    return album;
  }

  internal Album CreateAlbum(Album albumData)
  {
    Album album = _repository.CreateAlbum(albumData);
    return album;
  }

  internal Album GetAlbumById(int albumId)
  {
    Album album = _repository.GetAlbumById(albumId);

    if (album == null)
    {
      throw new Exception("Invalid album id: " + albumId);
    }

    return album;
  }

  internal List<Album> GetAlbums()
  {
    List<Album> albums = _repository.GetAlbums();
    return albums;
  }
}