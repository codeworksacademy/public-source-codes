namespace cryptipedia.Models;

public class CryptidEncounter : RepoItem<int>
{
  public string AccountId { get; set; }
  public int CryptidId { get; set; }
}


public class CryptidEncounterProfile : Profile
{
  public int CryptidEncounterId { get; set; }
  public DateTime EncounteredAt { get; set; }
}

public class CryptidEncounterCryptid : Cryptid
{
  public int CryptidEncounterId { get; set; }
}