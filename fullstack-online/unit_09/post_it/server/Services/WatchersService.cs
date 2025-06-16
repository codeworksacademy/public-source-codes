



namespace post_it.Services;

public class WatchersService
{
  private readonly WatchersRepository _repository;

  public WatchersService(WatchersRepository repository)
  {
    _repository = repository;
  }

  internal Watcher CreateWatcher(Watcher watcherData)
  {
    Watcher watcher = _repository.CreateWatcher(watcherData);
    return watcher;
  }

  internal void DeleteWatcher(int watcherId, Account userInfo)
  {
    Watcher watcher = GetWatcherById(watcherId);

    if (watcher.AccountId != userInfo.Id)
    {
      throw new Exception("You cannot delete another user's watched album, " + userInfo.Name);
    }

    _repository.DeleteWatcher(watcherId);
  }

  private Watcher GetWatcherById(int watcherId)
  {
    Watcher watcher = _repository.GetWatcherById(watcherId);

    if (watcher == null)
    {
      throw new Exception("Invalid watcher id: " + watcherId);
    }

    return watcher;
  }

  internal List<WatcherAlbum> GetWatcherAlbumsByAccountId(string accountId)
  {
    List<WatcherAlbum> watcherAlbums = _repository.GetWatcherAlbumsByAccountId(accountId);
    return watcherAlbums;
  }

  internal List<WatcherProfile> GetWatcherProfilesByAlbumId(int albumId)
  {
    List<WatcherProfile> watcherProfiles = _repository.GetWatcherProfilesByAlbumId(albumId);
    return watcherProfiles;
  }
}