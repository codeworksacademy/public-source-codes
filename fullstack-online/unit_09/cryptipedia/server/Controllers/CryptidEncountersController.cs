namespace cryptipedia.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CryptidEncountersController : ControllerBase
{
  private readonly CryptidEncountersService _cryptidEncountersService;
  private readonly Auth0Provider _auth0Provider;

  public CryptidEncountersController(CryptidEncountersService cryptidEncountersService, Auth0Provider auth0Provider)
  {
    _cryptidEncountersService = cryptidEncountersService;
    _auth0Provider = auth0Provider;
  }

  [Authorize]
  [HttpPost]
  public async Task<ActionResult<CryptidEncounterProfile>> CreateCryptidEncounter([FromBody] CryptidEncounter cryptidEncounterData)
  {
    try
    {
      Account userInfo = await _auth0Provider.GetUserInfoAsync<Account>(HttpContext);
      cryptidEncounterData.AccountId = userInfo.Id;
      CryptidEncounterProfile cryptidEncounter = _cryptidEncountersService.CreateCryptidEncounter(cryptidEncounterData);
      return Ok(cryptidEncounter);
    }
    catch (Exception exception)
    {
      return BadRequest(exception.Message);
    }
  }

  [Authorize]
  [HttpDelete("{cryptidEncounterId}")]
  public async Task<ActionResult<string>> DeleteCryptidEncounter(int cryptidEncounterId)
  {
    try
    {
      Account userInfo = await _auth0Provider.GetUserInfoAsync<Account>(HttpContext);
      _cryptidEncountersService.DeleteCryptidEncounter(cryptidEncounterId, userInfo);
      return Ok("No longer encountered that cryptid!");
    }
    catch (Exception exception)
    {
      return BadRequest(exception.Message);
    }
  }
}