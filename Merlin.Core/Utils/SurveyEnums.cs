using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core
{
    public static class SurveyType
    {
        public const string 
            OutbreakLevel = "OUTBREAK_LEVEL",
            OutbreakTemplate = "OUTBREAK_TEMPLATE"
            
            ;
    }

    public static class QuestionType
    {
        public const string
            YesNo = "YN",
            YesNoUnknown = "YNU",
            Text = "TEXT",
            Multi_Line_Text = "MULTI_LINE_TEXT",
            Dropdown = "DROPDOWN",
            Radio = "RADIO",
            Date = "DATE",
            Number = "NUMBER",
            Phone = "PHONE",
            Email = "EMAIL",
            Check = "CHECK"
            ;
    }
}
