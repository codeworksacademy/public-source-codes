




namespace post_it.Repositories;

public class WatchersRepository
{
  private readonly IDbConnection _db;

  public WatchersRepository(IDbConnection db)
  {
    _db = db;
  }

  internal Watcher CreateWatcher(Watcher watcherData)
  {
    string sql = @"
    INSERT INTO
    watchers(account_id, album_id)
    VALUES(@AccountId, @AlbumId);
    
    SELECT * FROM watchers WHERE id = LAST_INSERT_ID();";

    Watcher watcher = _db.Query<Watcher>(sql, watcherData).SingleOrDefault();

    return watcher;
  }

  internal void DeleteWatcher(int watcherId)
  {
    string sql = "DELETE FROM watchers WHERE id = @WatcherId LIMIT 1;";

    int rowsAffected = _db.Execute(sql, new { WatcherId = watcherId });

    if (rowsAffected != 1)
    {
      throw new Exception(rowsAffected + " rows are gone and that ain't good at all big dawg");
    }

  }

  internal List<WatcherAlbum> GetWatcherAlbumsByAccountId(string accountId)
  {
    string sql = @"
    SELECT
    watchers.*,
    albums.*,
    accounts.*
    FROM watchers
    INNER JOIN albums ON albums.id = watchers.album_id
    INNER JOIN accounts ON accounts.id = albums.creator_id
    WHERE watchers.account_id = @AccountId;";

    List<WatcherAlbum> watcherAlbums = _db.Query(sql, (Watcher watcher, WatcherAlbum album, Profile account) =>
    {
      album.AccountId = watcher.AccountId;
      album.WatcherId = watcher.Id;
      album.Creator = account;
      return album;
    }, new { AccountId = accountId }).ToList();

    return watcherAlbums;
  }

  internal Watcher GetWatcherById(int watcherId)
  {
    string sql = "SELECT * FROM watchers WHERE id = @WatcherId";

    Watcher watcher = _db.Query<Watcher>(sql, new { WatcherId = watcherId }).SingleOrDefault();

    return watcher;
  }

  internal List<WatcherProfile> GetWatcherProfilesByAlbumId(int albumId)
  {
    string sql = @"
    SELECT
    watchers.*,
    accounts.*
    FROM watchers
    INNER JOIN accounts ON accounts.id = watchers.account_id
    WHERE watchers.album_id = @AlbumId;";

    List<WatcherProfile> watcherProfiles = _db.Query(sql, (Watcher watcher, WatcherProfile account) =>
    {
      account.AlbumId = watcher.AlbumId;
      account.WatcherId = watcher.Id;
      return account;
    }, new { AlbumId = albumId }).ToList();

    return watcherProfiles;
  }
}