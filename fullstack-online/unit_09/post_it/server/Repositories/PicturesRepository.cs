



namespace post_it.Repositories;

public class PicturesRepository
{
  private readonly IDbConnection _db;

  public PicturesRepository(IDbConnection db)
  {
    _db = db;
  }

  internal Picture CreatePicture(Picture pictureData)
  {
    string sql = @"
    INSERT INTO
    pictures(creator_id, album_id, img_url)
    VALUES(@CreatorId, @AlbumId, @ImgUrl);
    
    SELECT
    pictures.*,
    accounts.*
    FROM pictures
    INNER JOIN accounts ON pictures.creator_id = accounts.id
    WHERE pictures.id = LAST_INSERT_ID();";

    Picture createdPicture = _db.Query(sql, (Picture picture, Profile account) =>
    {
      picture.Creator = account;
      return picture;
    }, pictureData).SingleOrDefault();

    return createdPicture;
  }

  internal void DeletePicture(int pictureId)
  {
    string sql = "DELETE FROM pictures WHERE id = @PictureId LIMIT 1;";

    int rowsAffected = _db.Execute(sql, new { PictureId = pictureId });

    if (rowsAffected != 1)
    {
      throw new Exception(rowsAffected + " rows were deleted and that ain't alright");
    }
  }

  internal Picture GetPictureById(int pictureId)
  {
    string sql = "SELECT * FROM pictures WHERE id = @PictureId;";

    Picture picture = _db.Query<Picture>(sql, new { PictureId = pictureId }).SingleOrDefault();

    return picture;
  }

  internal List<Picture> GetPicturesByAlbumId(int albumId)
  {
    string sql = @"
    SELECT
    pictures.*,
    accounts.*
    FROM pictures
    INNER JOIN accounts ON accounts.id = pictures.creator_id
    WHERE pictures.album_id = @AlbumId;";

    List<Picture> pictures = _db.Query(sql, (Picture picture, Profile account) =>
    {
      picture.Creator = account;
      return picture;
    }, new { AlbumId = albumId }).ToList();

    return pictures;
  }
}