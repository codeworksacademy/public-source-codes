




namespace gregslist_api_dotnet.Repositories;

public class CarsRepository
{

  private readonly IDbConnection _db;

  public CarsRepository(IDbConnection db)
  {
    _db = db;
  }

  internal Car CreateCar(Car carData)
  {
    string sql = @"
    INSERT INTO
    cars
    (make, model, year, price, img_url, description, engine_type, color, mileage, has_clean_title, creator_id)
    VALUES
    (@Make, @Model, @Year, @Price, @ImgUrl, @Description, @EngineType, @Color, @Mileage, @HasCleanTitle, @CreatorId);
    
    SELECT
    cars.*,
    accounts.*
    FROM cars
    INNER JOIN accounts ON cars.creator_id = accounts.id
    WHERE cars.id = LAST_INSERT_ID();";

    Car car = _db.Query(sql, (Car car, Account account) =>
    {
      car.Creator = account;
      return car;
    }, carData).SingleOrDefault();

    return car;
  }

  internal void DeleteCar(int carId)
  {
    string sql = "DELETE FROM cars WHERE id = @CarId LIMIT 1;";

    int rowsAffected = _db.Execute(sql, new { CarId = carId });

    if (rowsAffected != 1)
    {
      throw new Exception(rowsAffected + " rows have been affected and that is no good!");
    }
  }

  internal Car GetCarById(int carId)
  {
    string sql = @"
    SELECT
    cars.*,
    accounts.*
    FROM
    cars
    INNER JOIN accounts ON cars.creator_id = accounts.id
    WHERE
    cars.id = @CarId;";

    Car foundCar = _db.Query(sql, (Car car, Account account) =>
    {
      car.Creator = account;
      return car;
    }, new { CarId = carId }).SingleOrDefault();

    return foundCar;
  }

  internal List<Car> GetCars()
  {
    string sql = @"
    SELECT
    cars.*,
    accounts.*
    FROM cars
    INNER JOIN accounts ON cars.creator_id = accounts.id
    ORDER BY cars.created_at;";

    List<Car> cars = _db.Query(sql, (Car car, Account account) =>
    {
      car.Creator = account;
      return car;
    }).ToList();

    return cars;
  }

  internal List<Car> GetCarsByQuery(string make, string model)
  {
    string sql = @"
    SELECT
    cars.*,
    accounts.*
    FROM cars
    INNER JOIN accounts ON cars.creator_id = accounts.id
    WHERE cars.make LIKE @Make AND cars.model LIKE @Model
    ORDER BY cars.created_at;";


    List<Car> cars = _db.Query(sql, (Car car, Account account) =>
    {
      car.Creator = account;
      return car;
    }, new { Make = $"%{make}%", Model = $"%{model}%" }).ToList();

    return cars;
  }

  internal void UpdateCar(Car originalCar)
  {
    string sql = @"
    UPDATE cars
    SET
    img_url = @ImgUrl,
    description = @Description,
    price = @Price
    WHERE id = @Id LIMIT 1;";

    int rowsAffected = _db.Execute(sql, originalCar);

    if (rowsAffected != 1)
    {
      throw new Exception(rowsAffected + " rows have been affected and that is no good!");
    }
  }
}