


namespace cryptipedia.Repositories;

public class CryptidsRepository
{
  private readonly IDbConnection _db;

  public CryptidsRepository(IDbConnection db)
  {
    _db = db;
  }

  internal Cryptid CreateCryptid(Cryptid cryptidData)
  {
    string sql = @"
    INSERT INTO
    cryptids(name, threat_level, img_url, origin, size, description, discoverer_id)
    VALUES(@Name, @ThreatLevel, @ImgUrl, @Origin, @Size, @Description, @DiscovererId);

    SELECT
    cryptids.*,
    accounts.*
    FROM cryptids
    INNER JOIN accounts ON accounts.id = cryptids.discoverer_id
    WHERE cryptids.id = LAST_INSERT_ID();";

    Cryptid createdCryptid = _db.Query(sql, (Cryptid cryptid, Profile account) =>
    {
      cryptid.Discoverer = account;
      return cryptid;
    }, cryptidData).SingleOrDefault();

    return createdCryptid;
  }

  internal Cryptid GetCryptidById(int cryptidId)
  {
    string sql = @"
    SELECT
    cryptids.*,
    accounts.*
    FROM cryptids
    INNER JOIN accounts ON accounts.id = cryptids.discoverer_id
    WHERE cryptids.id = @CryptidId;";

    Cryptid foundCryptid = _db.Query(sql, (Cryptid cryptid, Profile account) =>
    {
      cryptid.Discoverer = account;
      return cryptid;
    }, new { CryptidId = cryptidId }).SingleOrDefault();

    return foundCryptid;
  }

  internal List<Cryptid> GetCryptids()
  {
    string sql = @"
    SELECT
    cryptids.*,
    COUNT(cryptid_encounters.id) AS encounter_count,
    accounts.*
    FROM cryptids
    LEFT OUTER JOIN cryptid_encounters ON cryptids.id = cryptid_encounters.cryptid_id
    INNER JOIN accounts ON accounts.id = cryptids.discoverer_id
    GROUP BY cryptids.id
    ORDER BY cryptids.id ASC;";

    List<Cryptid> cryptids = _db.Query(sql, (Cryptid cryptid, Profile account) =>
    {
      cryptid.Discoverer = account;
      return cryptid;
    }).ToList();

    return cryptids;
  }
}