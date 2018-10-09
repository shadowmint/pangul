using System;
using Pangul.Services.Infrastructure.Errors;

namespace Pangul.Services.Actions
{
  public static class CommandExtensions
  {
    public static void Validate(this ICommand self)
    {
      self.GuardPropertyValues();
      self.GuardRelatedObjects();
      self.DeriveProperties();
    }

    public static void GuardPropertyValue(this ICommand self, Func<bool> action, string message)
    {
      try
      {
        if (!action())
        {
          throw new CommandValidationException(CommandValidationType.InvalidProperty, message);
        }
      }
      catch (Exception error)
      {
        throw new CommandValidationException(CommandValidationType.InvalidProperty, message, error);
      }
    }

    public static void GuardRelatedObject(this ICommand self, Func<bool> action, string message)
    {
      try
      {
        if (!action())
        {
          throw new CommandValidationException(CommandValidationType.MissingRelatedObject, message);
        }
      }
      catch (Exception error)
      {
        throw new CommandValidationException(CommandValidationType.MissingRelatedObject, message, error);
      }
    }

    public static T DeriveProperty<T>(this ICommand self, Func<T> action, string message)
    {
      try
      {
        return action();
      }
      catch (Exception error)
      {
        throw new CommandValidationException(CommandValidationType.UnableToDeriveProperty, message, error);
      }
    }
  }
}