using Merlin.Core.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json.Linq;

namespace Merlin.Core.Survey.Services
{
    public class SurveyAnswerDelta
    {
        internal SurveyAnswerDelta(string key, object current, object incoming, AnswerState state)
        {
            Key = key;
            Current = current;
            Incoming = incoming;
            State = state;
        }
       internal readonly string Key;
       internal readonly object Current;
       internal readonly object Incoming;
       internal readonly AnswerState State;
    }

    internal enum AnswerState
    {
        Added,
        Deleted,
        Modified,
        Unchanged
    }
    internal static class SurveyAnswerHelpers
    {
        internal static IEnumerable<SurveyAnswerDelta> GetDeltas(
            IDictionary<string, object> currentAnswers,
            IDictionary<string, object> incomingAnswers)
        {
            var deltas = new HashSet<SurveyAnswerDelta>();

            //all keys should match
            var nonMatchingKeys = currentAnswers.Keys.Except(incomingAnswers.Keys);

            if (nonMatchingKeys.Any())
            {
                throw new ArgumentOutOfRangeException(
                    "Expected for current and incoming answer sets to have matching keys.  " +
                    $"Instead found '{string.Join(',', nonMatchingKeys)}' keys that were different");
            }

            foreach (var key in currentAnswers.Keys)
            {
                dynamic current = currentAnswers[key];
                dynamic incoming = incomingAnswers[key];

                System.Diagnostics.Debug.WriteLine($"c='{current.GetType()}' i='{incoming.GetType()}'");

                //unbox to the correct types
                if (!SurveyAnswerBindingHelpers.IsQuestion(key) && !SurveyAnswerBindingHelpers.IsRepeater(key))
                {
                    if (current is IEnumerable<IHaveUniqueKey>)
                    {
                        foreach (var delta in DetectChanges(key, current, incoming))
                        {
                            deltas.Add(delta);
                        }
                    }
                    else
                    {
                        //throw new NotImplementedException();
                    }
                }
                else if (SurveyAnswerBindingHelpers.IsRepeater(key))
                {
                    if (!JToken.DeepEquals(current, incoming))
                    {
                        deltas.Add(
                            new SurveyAnswerDelta(key, current, incoming, AnswerState.Modified));
                    }
                }
                else
                {
                    if (!Equals(current, incoming))
                    {
                        deltas.Add(
                            new SurveyAnswerDelta(key, current, incoming, AnswerState.Modified));
                    }
                }


            }

            return deltas;
        }

        private static IEnumerable<SurveyAnswerDelta> DetectChanges(string key, IEnumerable<IHaveUniqueKey> existing, IEnumerable<IHaveUniqueKey> incoming)
        {
            var comparer = new IHaveUniqueKeyComparer();

            //check for added
            foreach (var item in incoming.Except(existing, comparer))
            {
                yield return new SurveyAnswerDelta(
                    key,
                    null,
                    item,
                    AnswerState.Added);
            }

            //check for deleted
            foreach (var item in existing.Except(incoming, comparer))
            {
                yield return new SurveyAnswerDelta(
                    key,
                    item,
                    null,
                    AnswerState.Deleted);
            }

            //get common to check for changes
            var common = existing.Intersect(incoming, comparer);

            foreach (var item in common)
            {
                var existingItem = existing.Single(x => x.UniqueKey == item.UniqueKey);
                var incomingItem = incoming.Single(x => x.UniqueKey == item.UniqueKey);

                //see if item changed, must have overriden Equals
                if (!existingItem.Equals(incomingItem))
                {
                    yield return new SurveyAnswerDelta(
                        key,
                        existingItem,
                        incomingItem,
                        AnswerState.Modified);
                }
            }
        }
    }
}