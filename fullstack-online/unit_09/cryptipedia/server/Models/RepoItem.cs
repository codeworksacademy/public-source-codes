namespace cryptipedia.Models;


// NOTE abstract classes can only be inherited from, and never instantiated (newed up)
// NOTE when inheriting from RepoItem you must pass a type argument for the id type
public abstract class RepoItem<T>
{
  public T Id { get; set; }
  public DateTime CreatedAt { get; set; }
  public DateTime UpdatedAt { get; set; }
}