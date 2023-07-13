import { useState } from "react";
import NoteContext from "./noteContext";
import { json } from "react-router-dom";

const NoteState= (props)=>{
   const host = "https://note-backend-4b48349aa5cf.herokuapp.com";
    const notesInitialise=[]
    const [notes, setNotes]= useState(notesInitialise)


    
    //Get notes
    const getnotes = async() => {
      try{
        const response = await fetch(`${host}/api/notes/getnotes`, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token'),
          },
        });
        const json = await response.json();
        if (!Array.isArray(json)) {
          console.log('The API response is not an array.');
          return;
        }
        setNotes(json)
      } catch (error) {
        console.error('An error occurred while fetching the notes:', error);
      }
    }
    

    //Add notes
    const addNotes = async(title, description, tag) => {
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
      });
      const note = await response.json();
      setNotes(notes.concat(note))
    }
    

    //Del notes
    const delNotes= async(id)=>{
      const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token'),
        }
      });
      const json = response.json(); 
      const newNotes = notes.filter((note) => { return note._id !== id })
      setNotes(newNotes)
    }
    //Edit notes
    const editNotes= async(id, title, description, tag)=>{ const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
    });
    const json= response.json(); // parses JSON response into native JavaScript objects
  
    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }

    return(
        <NoteContext.Provider value={{notes, addNotes, editNotes, delNotes, getnotes}}>
{props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;




