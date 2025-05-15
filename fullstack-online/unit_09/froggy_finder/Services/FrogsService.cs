namespace froggy_finder_api.Services;

// NOTE service is purely business logic
public class FrogsService
{
  private readonly FrogsRepository _repository;

  public FrogsService(FrogsRepository frogsRepository)
  {
    _repository = frogsRepository;
  }

  public List<Frog> GetAllFrogs()
  {
    List<Frog> frogs = _repository.GetAllFrogs();
    return frogs;
  }

  public Frog GetFrogById(int frogId)
  {
    Frog frog = _repository.GetFrogById(frogId);

    if (frog == null)
    {
      throw new Exception("No frog found with the id of " + frogId);
    }

    return frog;
  }

  public Frog CreateFrog(Frog frogData)
  {
    Frog frog = _repository.CreateFrog(frogData);
    return frog;
  }

  public void DeleteFrog(int frogId)
  {
    _repository.DeleteFrog(frogId);
  }

  public Frog UpdateFrog(int frogId, Frog updateData)
  {
    Frog originalFrog = GetFrogById(frogId);

    originalFrog.Name = updateData.Name ?? originalFrog.Name;
    originalFrog.Age = updateData.Age ?? originalFrog.Age;
    originalFrog.Color = updateData.Color ?? originalFrog.Color;
    originalFrog.IsSingle = updateData.IsSingle ?? originalFrog.IsSingle;

    _repository.UpdateFrog(originalFrog);

    return originalFrog;
  }

}