

namespace gregslist_api_dotnet.Services;

public class CarsService
{

  private readonly CarsRepository _repository;

  public CarsService(CarsRepository repository)
  {
    _repository = repository;
  }

  internal Car CreateCar(Car carData)
  {
    Car car = _repository.CreateCar(carData);
    return car;
  }

  internal string DeleteCar(int carId, Account userInfo)
  {

    Car car = GetCarById(carId);

    if (car.CreatorId != userInfo.Id)
    {
      throw new Exception($"You cannot delete another user's car, {userInfo.Name}!");
    }

    _repository.DeleteCar(carId);

    return $"Your {car.Year} {car.Make} {car.Model} has been deleted!";
  }

  internal Car GetCarById(int carId)
  {
    Car car = _repository.GetCarById(carId);

    if (car == null)
    {
      throw new Exception("Invalid car id: " + carId);
    }

    return car;
  }

  // internal and public are very similar
  internal List<Car> GetCars()
  {
    List<Car> cars = _repository.GetCars();
    return cars;
  }

  // NOTE overload
  // you can reuse method names, and the appropriate method will be called by the number of arguments and types of arguments
  internal List<Car> GetCars(string make, string model)
  {
    List<Car> cars = _repository.GetCarsByQuery(make, model);
    return cars;
  }

  // NOTE overload example
  internal List<Car> GetCars(int year)
  {
    throw new NotImplementedException();
  }

  internal Car UpdateCar(int carId, Car updateData, Account userInfo)
  {
    Car originalCar = GetCarById(carId);

    if (originalCar.CreatorId != userInfo.Id)
    {
      throw new Exception($"You cannot update another user's car, {userInfo.Name}!");
    }

    originalCar.ImgUrl = updateData.ImgUrl ?? originalCar.ImgUrl;
    originalCar.Description = updateData.Description ?? originalCar.Description;
    originalCar.Price = updateData.Price ?? originalCar.Price;

    _repository.UpdateCar(originalCar);

    return originalCar;
  }
}