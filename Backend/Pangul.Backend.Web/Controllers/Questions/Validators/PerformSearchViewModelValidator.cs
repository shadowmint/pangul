using FluentValidation;
using Pangul.Backend.Web.Controllers.Questions.ViewModels;

namespace Pangul.Backend.Web.Controllers.Questions.Validators
{
  public class PerformSearchViewModelValidator : AbstractValidator<PerformSearchViewModel>
  {
    public PerformSearchViewModelValidator()
    {
      RuleFor(x => x.Query).NotEmpty();
      RuleFor(x => x.Offset).GreaterThanOrEqualTo(0);
      RuleFor(x => x.Limit).LessThanOrEqualTo(1024);
    }
  }
}