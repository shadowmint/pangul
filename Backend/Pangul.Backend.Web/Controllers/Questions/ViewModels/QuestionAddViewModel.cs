namespace Pangul.Backend.Web.Controllers.Questions.ViewModels
{
    public class QuestionAddViewModel
    {
        public string? Title { get; set; }
        public string? Body { get; set; }
        public string? Topic { get; set; }
        public string[]? Tags { get; set; }
    }
}