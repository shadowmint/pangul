using FluentValidation;
using Pangul.Backend.Web.Controllers.Questions.ViewModels;

namespace Pangul.Backend.Web.Controllers.Questions.Validators
{
  public class QuestionAddViewModelValidator : AbstractValidator<QuestionAddViewModel>
  {
    public QuestionAddViewModelValidator()
    {
      RuleFor(x => x.Title).NotEmpty();
      RuleFor(x => x.Body).NotEmpty();
    }
  }
}