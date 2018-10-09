using FluentValidation;
using Pangul.Backend.Web.Controllers.Questions.ViewModels;

namespace Pangul.Backend.Web.Controllers.Questions.Validators
{
  public class QuestionMetadataUpdateViewModelValidator : AbstractValidator<QuestionMetadataUpdateViewModel>
  {
    public QuestionMetadataUpdateViewModelValidator()
    {
      RuleFor(x => x.QuestionId).NotEmpty();
      RuleFor(x => x.RowVersion).NotEmpty();
      RuleFor(x => x.Votes).InclusiveBetween(-1, 1);
    }
  }
}