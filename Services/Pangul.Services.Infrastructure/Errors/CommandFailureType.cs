namespace Pangul.Services.Infrastructure.Errors
{
  public enum CommandFailureType
  {
    ConflictingData,
    TransactionFailed,
    MissingData,
    InvalidRelation,
    ConstraintFailed
  }
}