namespace froggy_finder_api.Controllers;

[ApiController]
[Route("api/frogs")] // https://localhost:7045/api/frogs
public class FrogsController : ControllerBase
{

  private readonly FrogsService _frogsService;

  // NOTE constructor
  public FrogsController(FrogsService frogsService)
  {
    // this._frogsService = frogsService;
    _frogsService = frogsService;
  }


  [HttpGet("hello")]
  public string SayHello()
  {
    return "Hello from the frogs API";
  }

  [HttpGet]
  public ActionResult<List<Frog>> GetAllFrogs()
  {
    try
    {
      List<Frog> frogs = _frogsService.GetAllFrogs();
      return Ok(frogs); // 200
    }
    catch (Exception exception)
    {
      return BadRequest(exception.Message); // 400
    }
  }

  [HttpGet("{frogId}")]
  public ActionResult<Frog> GetFrogById(int frogId)
  {
    try
    {
      Frog frog = _frogsService.GetFrogById(frogId);
      return Ok(frog);
    }
    catch (Exception exception)
    {
      return BadRequest(exception.Message); // 400
    }
  }

  [HttpPost]
  public ActionResult<Frog> CreateFrog([FromBody] Frog frogData)
  {
    try
    {
      Frog frog = _frogsService.CreateFrog(frogData);
      return frog;
    }
    catch (Exception exception)
    {
      return BadRequest(exception.Message);
    }
  }

  [HttpDelete("{frogId}")]
  public ActionResult<string> DeleteFrog(int frogId)
  {
    try
    {
      _frogsService.DeleteFrog(frogId);
      return Ok("Frog was deleted!");
    }
    catch (Exception exception)
    {
      return BadRequest(exception.Message);
    }
  }

  [HttpPut("{frogId}")]
  public ActionResult<Frog> UpdateFrog(int frogId, [FromBody] Frog updateData)
  {
    try
    {
      Frog frog = _frogsService.UpdateFrog(frogId, updateData);
      return Ok(frog);
    }
    catch (Exception exception)
    {
      return BadRequest(exception.Message);
    }
  }
}