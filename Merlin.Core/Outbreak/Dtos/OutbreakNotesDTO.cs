using System;
using System.Collections.Generic;
using System.Text;

namespace Merlin.Core.Outbreak
{
    public class OutbreakNotesDTO
    {
        public int  EventId { get; set; } //Id_Event
        public string Note { get; set; } //Ds_Desc
        public DateTime DateAdded { get; set; } //Dt_Added
        public string AuthorName { get; set; } //Ds_Author
        public string NoteType { get; set; } //Cd_Event_Type
    }
}
