using Merlin.Core.Codes.Dtos;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Merlin.Core.Survey.Dtos
{
    public static class LayoutItemType
    {
        public const string Question = "question";
    }
    public class LayoutItemDto {
        public LayoutItemDto()
        {
            Items = new List<LayoutItemDto>();
            GroupAccess = new List<string>();
        }
        public string Id { get; set; }
        public string Number { get; set; }
        public bool IsNumbered { get; set; }
        public bool TextHidden { get; set; }
        public int Width { get; set; }
        public string Type { get; set; }
        public string Text { get; set; }
        public string Title { get; set; }
        public string QuestionType { get; set; }
        public IEnumerable<DropdownCode> Choices { get; set; }
        public string MessageType { get; set; }
        public string AlertType { get; set; }
        public ActivationDto Activation { get; set; }
        public IEnumerable<ValidationDto> Validations { get; set; }
        public IEnumerable<LayoutItemDto> Items { get; set; }
        public List <string> GroupAccess { get; set; }

        public bool ShouldDeserializeChoices() {
            return false;
        }

        public bool ShouldSerializeChoicesOnSave() {
            return false;
        }

        public bool ShouldSerializeTextOnSave() {
            switch(Type) {
                case "question":
                    return false;
                case "section":
                    return false;
                default:
                    return true;
            }
        }

        public bool ShouldSerializeQuestionTypeOnSave() {
            return false;
        }


        //May use these methods in the future
        //public bool ShouldSerializeActivationRulesOnSave() {
        //    switch (Type) {
        //        case "section":
        //            return true;
        //        default:
        //            return false;
        //    }
        //}

        //public bool ShouldSerializeValidationsOnSave() {

        //}
    }

    public static class LayoutItemHelpers
    {
        public static IEnumerable<LayoutItemDto> GetAll(this IEnumerable<LayoutItemDto> items, params string[] layoutItemTypes)
        {
            if (items != null)
            {
                foreach (var item in items)
                {
                    if (layoutItemTypes.Contains(item.Type))
                    {
                        yield return item;
                    }
                    // questions in repeaters handled elsewhere
                    if (item.Type != "repeatingQuestionsGroup")
                    {
                        foreach (var subItem in GetAll(item.Items, layoutItemTypes))
                        {
                            yield return subItem;
                        }
                    }

                }
            }
        }
    }

    public class SerializationContractResolver : DefaultContractResolver {
        public static readonly SerializationContractResolver Instance = new SerializationContractResolver();

        protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization) {
            JsonProperty property = base.CreateProperty(member, memberSerialization);

            MethodInfo shouldDeserializeMethodInfo = member.DeclaringType.GetMethod("ShouldDeserialize" + member.Name);

            if (shouldDeserializeMethodInfo != null) {
                property.ShouldDeserialize = o => { return (bool)shouldDeserializeMethodInfo.Invoke(o, null); };
            }

            MethodInfo shouldSerializeMethodInfo = member.DeclaringType.GetMethod("ShouldSerialize" + member.Name + "OnSave");

            if (shouldSerializeMethodInfo != null) {
                property.ShouldSerialize = o => { return (bool)shouldSerializeMethodInfo.Invoke(o, null); };
            }

            return property;
        }
    }
}