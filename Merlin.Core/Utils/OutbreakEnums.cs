using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core
{
    public static class OutbreakEventType
    {
        public const string
            EpiComPostId = "EPICOM_POST_ID",
            PendingEpiComPostId = "EPICOM_PENDING_ID",
            EpiComForum = "EPICOM_FORUM",
            EpiComTopic = "EPICOM_TOPIC",
            EpiComTitle = "EPICOM_TITLE",
            MultiCounty = "MULTI_COUNTY",
            MultiState = "MULTI_STATE",
            MultiCountry = "MULTI_COUNTRY",
            StudyDesign = "STUDY_DESIGN",
            Investigation = "INVESTIGATION",
            Regulatory = "REGULATORY",
            CaseDefinition = "DEFINITION",
            LabFindings = "LAB_FINDINGS",
            Closure = "CLOSURE",
            ConclusionNotes = "CONCL_NOTES",
            Recommendations = "RECOMMEND",
            Review = "REVIEW",
            ProcessImprovements = "IMPROVEMENT"

            ;
    }

    public static class OutbreakReviewStatus
    {
        public const string
            Pending = "PENDING",
            Accepted = "ACCEPTED"

            ;
    }

    public static class SymptomType
    {
        public const string Other = "OTHER";
    }
}
