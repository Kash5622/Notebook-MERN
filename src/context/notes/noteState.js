import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const s1 = [];
  const [notes, setNotes] = useState(s1);

  // Add a note
  const getNote = async () => {
    // Api call
    const response = await fetch(`${host}/api/notes/getnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('Auth-Token'),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
    
  }



  const addNote = async (title, description, tag) => {
    // Api call
    const response = await fetch(`${host}/api/notes/writenotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('Auth-Token'),
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();

    // Add note
    const note = {
      "_id": "6307b6ac565badf2ed72830a",
      "user": "63027826139083668b2a933714",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-08-25T17:51:40.243Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }



  // Delete a Note
  const deleteNote = async (id) => {
    // Api call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('Auth-Token'),
      },
    });
    const json = await response.json();

    // delete note
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }



  // Update a Note
  const updateNote = async (id, title, description, tag) => {
    // Api call for update note
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('Auth-Token'),
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();

    // update note
    let newnote= JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = newnote[index];
      if (element._id === id) {
        newnote[index].title = title;
        newnote[index].description = description;
        newnote[index].tag = tag;
        break;
      }
    }
    setNotes(newnote);
  }
  

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, updateNote,getNote ,setNotes}}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;