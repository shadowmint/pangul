using FluentValidation;
using Pangul.Backend.Web.Controllers.Answers.ViewModels;

namespace Pangul.Backend.Web.Controllers.Answers.Validators
{
  public class UpdateAnswerViewModelValidator : AbstractValidator<UpdateAnswerViewModel>
  {
    public UpdateAnswerViewModelValidator()
    {
      RuleFor(x => x.AnswerId).NotEmpty();
      RuleFor(x => x.Body).NotEmpty();
    }
  }
}