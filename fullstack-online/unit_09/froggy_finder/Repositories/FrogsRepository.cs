namespace froggy_finder_api.Repositories;
// NOTE repository is purely for interacting with the database
public class FrogsRepository
{

  private readonly IDbConnection _db;

  public FrogsRepository(IDbConnection db)
  {
    _db = db;
  }

  public List<Frog> GetAllFrogs()
  {
    string sql = "SELECT * FROM frogs;";

    List<Frog> frogs = _db.Query<Frog>(sql).ToList();

    return frogs;
  }

  public Frog GetFrogById(int frogId)
  {
    // string sql = $"SELECT * FROM frogs WHERE id = {frogId};"; ⚠️ THIS IS BAD!!!!!!

    string sql = "SELECT * FROM frogs WHERE id = @FrogId;";

    //                                    { FrogId : 5 }
    Frog frog = _db.Query<Frog>(sql, new { FrogId = frogId }).SingleOrDefault();

    return frog;
  }

  public Frog CreateFrog(Frog frogData)
  {
    string sql = @"
    INSERT INTO
      frogs (name, color, age, is_single)
    VALUES
      (@Name, @Color, @Age, @IsSingle);
    
    SELECT * FROM frogs WHERE id = LAST_INSERT_ID();";

    Frog frog = _db.Query<Frog>(sql, frogData).SingleOrDefault();
    return frog;
  }

  public void DeleteFrog(int frogId)
  {
    string sql = "DELETE FROM frogs WHERE id = @FrogId LIMIT 1;";

    int rowsAffected = _db.Execute(sql, new { FrogId = frogId });

    if (rowsAffected != 1)
    {
      throw new Exception(rowsAffected + " rows were affected and that is bad!");
    }
  }

  public void UpdateFrog(Frog frog)
  {
    string sql = @"
    UPDATE frogs
    SET
      name = @Name,
      age = @Age,
      color = @Color,
      is_single = @IsSingle
    WHERE
      id = @Id LIMIT 1;";

    int rowsAffected = _db.Execute(sql, frog);

    if (rowsAffected != 1)
    {
      throw new Exception(rowsAffected + " rows were affected and that is bad!");
    }
  }
}