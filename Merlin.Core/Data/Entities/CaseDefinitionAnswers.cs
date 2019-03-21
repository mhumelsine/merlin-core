using System;
using System.Collections.Generic;

namespace Merlin.Core.Data
{
    public partial class CaseDefinitionAnswers
    {
        public int IdCase { get; set; }
        public int IdSequence { get; set; }
        public string InAnswer { get; set; }
        public string DsPromptInfo { get; set; }
    }
}
