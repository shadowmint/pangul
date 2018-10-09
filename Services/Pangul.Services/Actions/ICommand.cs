namespace Pangul.Services.Actions
{
  public interface ICommand
  {
    void GuardPropertyValues();
    void GuardRelatedObjects();
    void DeriveProperties();
  }
}