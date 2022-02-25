﻿using System.Collections.Generic;
using System.Linq;
using NCore.Optional;
using Pangul.Core.Data.Questions;

namespace Pangul.Backend.Web.Controllers.Questions.ViewModels
{
  public class QuestionSummaryViewModel
  {
    private const int MaxSummaryLength = 256;
    private const int MaxAnswerSummaryLength = 256;

    public string? QuestionId { get; set; }
    public string? Title { get; set; }
    public string? Summary { get; set; }
    public string? Answer { get; set; }
    public IList<string>? Tags { get; set; }
    public string? Topic { get; set; }
    public bool CanEdit { get; set; }
    public string? UserId { get; set; }

    public static QuestionSummaryViewModel From(Question question, Option<Answer> bestAnswer)
    {
      return new QuestionSummaryViewModel()
      {
        QuestionId = question.QuestionId.ToString(),
        UserId = question.UserId.ToString(),
        Title = question.Title,
        Tags = question.Tags.Select(i => i.Tag).ToList(),
        Summary = MakeSummaryFrom(question),
        Answer = MakeSummaryFrom(bestAnswer),
        Topic = question.Topic.Name,
        CanEdit = question.CanEdit
      };
    }

    private static string MakeSummaryFrom(Question question)
    {
      var tmp = question.Body.Trim();
      if (tmp.Length > MaxSummaryLength)
      {
        tmp = tmp.Substring(0, MaxSummaryLength) + "...";
      }

      return tmp;
    }

    private static string MakeSummaryFrom(Option<Answer> bestAnswer)
    {
      if (!bestAnswer) return null;
      var answerText = bestAnswer.Unwrap(() => new Answer()).Body.Trim();
      if (answerText.Length > MaxSummaryLength)
      {
        answerText = answerText.Substring(0, MaxAnswerSummaryLength) + "...";
      }

      return answerText;

    }
  }
}