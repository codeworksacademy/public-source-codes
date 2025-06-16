




namespace cryptipedia.Repositories;

public class CryptidEncountersRepository
{
  private readonly IDbConnection _db;

  public CryptidEncountersRepository(IDbConnection db)
  {
    _db = db;
  }

  internal CryptidEncounterProfile CreateCryptidEncounter(CryptidEncounter cryptidEncounterData)
  {
    string sql = @"
    INSERT INTO
    cryptid_encounters(account_id, cryptid_id)
    VALUES(@AccountId, @CryptidId);

    SELECT
    accounts.*,
    cryptid_encounters.id AS cryptid_encounter_id,
    cryptid_encounters.created_at AS encountered_at
    FROM cryptid_encounters
    INNER JOIN accounts ON accounts.id = cryptid_encounters.account_id
    WHERE cryptid_encounters.id = LAST_INSERT_ID();";

    CryptidEncounterProfile cryptidEncounter = _db.Query<CryptidEncounterProfile>(sql, cryptidEncounterData).SingleOrDefault();

    return cryptidEncounter;
  }

  internal void DeleteCryptidEncounter(int cryptidEncounterId)
  {
    string sql = "DELETE FROM cryptid_encounters WHERE id = @CryptidEncounterId;";

    int rowsAffected = _db.Execute(sql, new { CryptidEncounterId = cryptidEncounterId });

    if (rowsAffected != 1)
    {
      throw new Exception(rowsAffected + " rows are gone and that ain't good");
    }
  }

  internal CryptidEncounter GetCryptidEncounterById(int cryptidEncounterId)
  {
    string sql = "SELECT * FROM cryptid_encounters WHERE id = @CryptidEncounterId;";

    CryptidEncounter cryptidEncounter = _db.Query<CryptidEncounter>(sql, new { CryptidEncounterId = cryptidEncounterId }).SingleOrDefault();

    return cryptidEncounter;
  }

  internal List<CryptidEncounterProfile> GetCryptidEncounterProfilesByCryptidId(int cryptidId)
  {
    // NOTE this is all fine and valid
    // string sql = @"
    // SELECT
    // cryptid_encounters.*,
    // accounts.*,
    // FROM cryptid_encounters
    // INNER JOIN accounts ON accounts.id = cryptid_encounters.account_id
    // WHERE cryptid_id = @CryptidId
    // ORDER BY cryptid_encounters.created_at ASC;";

    // List<CryptidEncounterProfile> profiles = _db.Query(sql,
    // (CryptidEncounter cryptidEncounter, CryptidEncounterProfile account) =>
    // {
    //   account.CryptidEncounterId = cryptidEncounter.Id;
    //   account.EncounteredAt = cryptidEncounter.CreatedAt;
    //   return account;
    // }, new { CryptidId = cryptidId }).ToList();

    string sql = @"
    SELECT
    accounts.*,
    cryptid_encounters.id AS cryptid_encounter_id,
    cryptid_encounters.created_at AS encountered_at
    FROM cryptid_encounters
    INNER JOIN accounts ON accounts.id = cryptid_encounters.account_id
    WHERE cryptid_id = @CryptidId
    ORDER BY cryptid_encounters.created_at ASC;";

    List<CryptidEncounterProfile> profiles = _db.Query<CryptidEncounterProfile>(sql, new { CryptidId = cryptidId }).ToList();

    return profiles;
  }

  internal List<CryptidEncounterCryptid> GetCryptidEncountersByAccountId(string accountId)
  {
    string sql = @"
    SELECT
    cryptid_encounters.*,
    cryptids.*,
    accounts.*
    FROM cryptid_encounters
    INNER JOIN cryptids ON cryptids.id = cryptid_encounters.cryptid_id
    INNER JOIN accounts ON accounts.id = cryptids.discoverer_id
    WHERE cryptid_encounters.account_id = @AccountId
    ORDER BY cryptid_encounters.created_at ASC;";

    List<CryptidEncounterCryptid> cryptids = _db.Query(sql,
    (CryptidEncounter cryptidEncounter, CryptidEncounterCryptid cryptid, Profile account) =>
    {
      cryptid.CryptidEncounterId = cryptidEncounter.Id;
      cryptid.Discoverer = account;
      return cryptid;
    }, new { AccountId = accountId }).ToList();

    return cryptids;
  }
}