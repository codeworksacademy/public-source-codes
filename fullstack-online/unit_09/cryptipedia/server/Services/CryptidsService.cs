


namespace cryptipedia.Services;

public class CryptidsService
{
  private readonly CryptidsRepository _repository;

  public CryptidsService(CryptidsRepository repository)
  {
    _repository = repository;
  }

  internal Cryptid CreateCryptid(Cryptid cryptidData)
  {
    Cryptid cryptid = _repository.CreateCryptid(cryptidData);
    return cryptid;
  }

  internal Cryptid GetCryptidById(int cryptidId)
  {
    Cryptid cryptid = _repository.GetCryptidById(cryptidId);

    if (cryptid == null)
    {
      throw new Exception("No cryptid found with the id of " + cryptidId);
    }

    return cryptid;
  }

  internal List<Cryptid> GetCryptids()
  {
    List<Cryptid> cryptids = _repository.GetCryptids();
    return cryptids;
  }
}