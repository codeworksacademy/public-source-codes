



namespace post_it.Repositories;

public class AlbumsRepository
{
  private readonly IDbConnection _db;

  public AlbumsRepository(IDbConnection db)
  {
    _db = db;
  }

  internal void ArchiveAlbum(Album album)
  {
    string sql = "UPDATE albums SET archived = @Archived WHERE id = @Id LIMIT 1;";

    int rowsAffected = _db.Execute(sql, album);

    if (rowsAffected != 1)
    {
      throw new Exception(rowsAffected + " rows were updated and that is no good, pal");
    }
  }

  internal Album CreateAlbum(Album albumData)
  {
    string sql = @"
    INSERT INTO
    albums(title, description, creator_id, cover_img, category)
    VALUES(@Title, @Description, @CreatorId, @CoverImg, @Category);

    SELECT
    albums.*,
    accounts.*
    FROM albums
    INNER JOIN accounts ON albums.creator_id = accounts.id
    WHERE albums.id = LAST_INSERT_ID();";

    Album createdAlbum = _db.Query(sql, (Album album, Profile account) =>
    {
      album.Creator = account;
      return album;
    }, albumData).SingleOrDefault();

    return createdAlbum;
  }

  internal Album GetAlbumById(int albumId)
  {
    string sql = @"
    SELECT
    albums.*,
    accounts.*
    FROM albums
    INNER JOIN accounts ON albums.creator_id = accounts.id
    WHERE albums.id = @AlbumId;";

    Album foundAlbum = _db.Query(sql, (Album album, Profile account) =>
    {
      album.Creator = account;
      return album;
    }, new { AlbumId = albumId }).SingleOrDefault();

    return foundAlbum;
  }

  internal List<Album> GetAlbums()
  {
    string sql = @"
    SELECT
    albums.*,
    accounts.*
    FROM albums
    INNER JOIN accounts ON albums.creator_id = accounts.id;";

    List<Album> albums = _db.Query(sql, (Album album, Profile account) =>
    {
      album.Creator = account;
      return album;
    }).ToList();

    return albums;
  }
}