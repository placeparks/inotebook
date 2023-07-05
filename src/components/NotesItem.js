import { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function NotesItem(props){
  const context = useContext(noteContext);
  const {delNotes}= context;
const {note, updateNote} = props;
    return(
        <div className="col-md-3">
            <div className="card my-3">
  <div className="card-body">
    <div className="d-flex align-items-center">
    <h5 className="card-title">{note.title}</h5>
    <i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>{
      delNotes(note._id)
    }}></i>
    <i className="fa-solid fa-file-pen mx-2"  onClick={()=>{updateNote(note)}}></i>
    </div>
    <p className="card-text">{note.description}</p>

  </div>
</div>
    </div>
    )
}