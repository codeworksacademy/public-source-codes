



namespace cryptipedia.Services;

public class CryptidEncountersService
{
  private readonly CryptidEncountersRepository _repository;

  public CryptidEncountersService(CryptidEncountersRepository repository)
  {
    _repository = repository;
  }

  internal CryptidEncounterProfile CreateCryptidEncounter(CryptidEncounter cryptidEncounterData)
  {
    CryptidEncounterProfile cryptidEncounter = _repository.CreateCryptidEncounter(cryptidEncounterData);
    return cryptidEncounter;
  }

  internal void DeleteCryptidEncounter(int cryptidEncounterId, Account userInfo)
  {
    CryptidEncounter cryptidEncounter = GetCryptidEncounterById(cryptidEncounterId);

    if (cryptidEncounter.AccountId != userInfo.Id)
    {
      throw new Exception($"You cannot delete another user's encounter, {userInfo.Name}!!!");
    }

    _repository.DeleteCryptidEncounter(cryptidEncounterId);
  }

  internal List<CryptidEncounterProfile> GetCryptidEncounterProfilesByCryptidId(int cryptidId)
  {
    List<CryptidEncounterProfile> profiles = _repository.GetCryptidEncounterProfilesByCryptidId(cryptidId);
    return profiles;
  }

  internal List<CryptidEncounterCryptid> GetCryptidEncountersByAccountId(string accountId)
  {
    List<CryptidEncounterCryptid> cryptids = _repository.GetCryptidEncountersByAccountId(accountId);
    return cryptids;
  }

  private CryptidEncounter GetCryptidEncounterById(int cryptidEncounterId)
  {
    CryptidEncounter cryptidEncounter = _repository.GetCryptidEncounterById(cryptidEncounterId);

    if (cryptidEncounter == null)
    {
      throw new Exception("Invalid cryptid encounter id: " + cryptidEncounterId);
    }

    return cryptidEncounter;
  }
}