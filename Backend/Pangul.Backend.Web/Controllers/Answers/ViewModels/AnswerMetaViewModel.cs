namespace Pangul.Backend.Web.Controllers.Answers
{
  internal class AnswerMetaViewModel 
  {
    public string RowVersion { get; set; }
    public AnswerGlobalMetaViewModel Global { get; set; }
    public int Votes { get; set; }
    public string AnswerMetaId { get; set; }
    public string AnswerId { get; set; }
  }
}