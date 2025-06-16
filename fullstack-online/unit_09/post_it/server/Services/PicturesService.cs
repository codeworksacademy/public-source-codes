


namespace post_it.Services;

public class PicturesService
{
  private readonly PicturesRepository _repository;
  private readonly AlbumsService _albumsService; // NOTE services are friends 🧑‍🤝‍🧑

  public PicturesService(PicturesRepository repository, AlbumsService albumsService)
  {
    _repository = repository;
    _albumsService = albumsService;
  }

  internal Picture CreatePicture(Picture pictureData)
  {
    Album album = _albumsService.GetAlbumById(pictureData.AlbumId);

    if (album.Archived)
    {
      throw new Exception($"{album.Title} is archived and no longer accepting pictures!");
    }

    Picture picture = _repository.CreatePicture(pictureData);
    return picture;
  }

  internal void DeletePicture(int pictureId, Account userInfo)
  {
    Picture picture = GetPictureById(pictureId);

    if (picture.CreatorId != userInfo.Id)
    {
      throw new Exception($"You cannot delete another user's picture, {userInfo.Name}!!!");
    }

    _repository.DeletePicture(pictureId);
  }

  private Picture GetPictureById(int pictureId)
  {
    Picture picture = _repository.GetPictureById(pictureId);
    return picture;
  }


  internal List<Picture> GetPicturesByAlbumId(int albumId)
  {
    List<Picture> pictures = _repository.GetPicturesByAlbumId(albumId);
    return pictures;
  }
}