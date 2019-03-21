using Isf.BusinessRules;
using Merlin.Core.Codes.Services;
using Merlin.Core.Data.DataContexts;
using Merlin.Core.Survey.Dtos;
using Merlin.Core.Survey.Services;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Merlin.Core.Survey.Rules
{
    //TODO:  This needs major refactoring
    public class SurveyAnswerRules : AsyncDynamicBusinessRuleBuilder
    {
        private readonly MerlinReadContext readContext;
        private readonly CodeRepository codeRepository;

        public SurveyAnswerRules(MerlinReadContext readContext, CodeRepository codeRepository)
        {
            this.readContext = readContext;
            this.codeRepository = codeRepository;
        }

        public SurveyAnswerRules AnswersAreCorrect()
        {
            Rule(async command =>
            {

                SurveyAnswerBindingHelpers.Bind(command.Answers);

                IDictionary<string, object> answers = command.Answers;

                foreach (var questionId in answers.Keys)
                {
                    if (!SurveyAnswerBindingHelpers.IsQuestion(questionId))
                    {
                        //skip validating the control types
                        continue;
                    }

                    var questionBank = await readContext.SurveyQuestionBank
                                .FindAsync(questionId);

                    var question = new QuestionDto
                    {
                        UID = questionBank.UID,
                        QuestionId = questionBank.IdQuestion,
                        QuestionText = questionBank.DsQuestion,
                        CodeType = questionBank.CdCodeType,
                        QuestionType = questionBank.CdQuestionType,
                        SaveToBank = questionBank.InBankQuestion,
                        HasBeenAnswered = questionBank.InAnswered
                    };

                    if (question == null)
                    {
                        Error($"Question with Question ID '{questionId}' was not found", "AnswerValidation");
                    }

                    var answer = command.Answers[questionId];

                    //Answers are optional no need to validate
                    if (answer == null || answer is string && string.IsNullOrWhiteSpace((string)answer))
                    {
                        continue;
                    }


                    //why does this not return a bool?
                    var response = EnsureAnswerIsCorrectDataType(question.QuestionType, answer);

                    if (response != string.Empty)
                    {
                        Error(response, questionId.ToString().ToUpper());
                    }



                    if (!string.IsNullOrWhiteSpace(question.CodeType))
                    {
                        var dropdownList = await codeRepository.GetCodes(question.CodeType);

                        var list = SurveyAnswerBindingHelpers.HasMultipleAnswers(answer) ? answer : new[] { answer };

                        foreach (var item in list)
                        {
                            if (!dropdownList.Any(code => code.Code == item))
                            {
                                Error($"Answer value '{item}' is not a valid code from code type '{question.CodeType}'", "AnswerValidation");
                            }
                        }
                    }
                }
            });

            return this;
        }

        private string InvalidDataType(Type expectedType, Type actualType)
        {
            //return $"Expected Data Type '{expectedType}' but found type '{actualType}' instead.";
            return $"Invalid answer provided.";
        }

        private string EnsureAnswerIsCorrectDataType(string questionType, object answer)
        {
            Type answerDataType = answer.GetType();

            switch (questionType)
            {
                case "DATE":
                    if (answer is DateTime
                        || string.IsNullOrEmpty((string)answer)
                        || (answer is string && DateTime.TryParse((string)answer, out var d)))
                    {
                        return string.Empty;
                    }
                    return (InvalidDataType(typeof(DateTime), answerDataType));


                case "NUMBER":
                    if (answer is int
                        || string.IsNullOrEmpty((string)answer)
                        || (answer is string && int.TryParse((string)answer, out var i)))
                    {
                        return string.Empty;
                    }

                    return (InvalidDataType(typeof(int), answerDataType));

                case "YN":
                case "YNU":
                case "RADIO":
                case "DROPDOWN":
                case "TEXT":
                case "MULTI_LINE_TEXT":
                case "EMAIL":
                case "PHONE":
                    if (answer is string)
                    {
                        return string.Empty;
                    }
                    return (InvalidDataType(typeof(string), answerDataType));

                case "CHECK":
                    if (SurveyAnswerBindingHelpers.HasMultipleAnswers(answer))
                    {
                        return string.Empty;
                    }
                    return (InvalidDataType(typeof(IEnumerable), answerDataType));
                default:
                    throw new InvalidOperationException(
                        $"Question Type '{questionType}' is not a recognized question type");
            }

        }

    }
}
