using System.Threading.Tasks;

namespace gregslist_api_dotnet.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarsController : ControllerBase
{

  private readonly CarsService _carsService;
  private readonly Auth0Provider _auth0Provider;

  public CarsController(CarsService carsService, Auth0Provider auth0Provider)
  {
    _carsService = carsService;
    _auth0Provider = auth0Provider;
  }


  [HttpGet]
  public ActionResult<List<Car>> GetCars([FromQuery] string make, [FromQuery] string model)
  {
    try
    {
      // NOTE without query
      // List<Car> cars = _carsService.GetCars();
      // return Ok(cars);

      List<Car> cars;

      if (make == null && model == null)
      {
        cars = _carsService.GetCars();
      }
      else
      {
        cars = _carsService.GetCars(make, model);
      }

      return Ok(cars);
    }
    catch (Exception exception)
    {
      return BadRequest(exception.Message);
    }
  }


  [HttpGet("{carId}")]
  public ActionResult<Car> GetCarById(int carId)
  {
    try
    {
      Car car = _carsService.GetCarById(carId);
      return Ok(car);
    }
    catch (Exception exception)
    {
      return BadRequest(exception.Message);
    }
  }

  [Authorize] // you must be logged in
  [HttpPost]
  public async Task<ActionResult<Car>> CreateCar([FromBody] Car carData)
  {
    try
    {
      Account userInfo = await _auth0Provider.GetUserInfoAsync<Account>(HttpContext);
      carData.CreatorId = userInfo.Id; // whoever makes the request owns the car
      Car car = _carsService.CreateCar(carData);
      return Ok(car);
    }
    catch (Exception exception)
    {
      return BadRequest(exception.Message);
    }
  }

  [Authorize]
  [HttpDelete("{carId}")]
  public async Task<ActionResult<string>> DeleteCar(int carId)
  {
    try
    {
      Account userInfo = await _auth0Provider.GetUserInfoAsync<Account>(HttpContext);
      string message = _carsService.DeleteCar(carId, userInfo);
      return Ok(message);
    }
    catch (Exception exception)
    {
      return BadRequest(exception.Message);
    }
  }

  [Authorize]
  [HttpPut("{carId}")]
  public async Task<ActionResult<Car>> UpdateCar(int carId, [FromBody] Car updateData)
  {
    try
    {
      Account userInfo = await _auth0Provider.GetUserInfoAsync<Account>(HttpContext);
      Car car = _carsService.UpdateCar(carId, updateData, userInfo);
      return Ok(car);
    }
    catch (Exception exception)
    {
      return BadRequest(exception.Message);
    }
  }
}