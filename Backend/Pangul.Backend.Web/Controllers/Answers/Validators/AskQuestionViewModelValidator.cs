using FluentValidation;
using Pangul.Backend.Web.Controllers.Answers.ViewModels;

namespace Pangul.Backend.Web.Controllers.Answers.Validators
{
  public class AddAnswerViewModelValidator : AbstractValidator<AddAnswerViewModel>
  {
    public AddAnswerViewModelValidator()
    {
      RuleFor(x => x.QuestionId).NotEmpty();
      RuleFor(x => x.Body).NotEmpty();
    }
  }
}