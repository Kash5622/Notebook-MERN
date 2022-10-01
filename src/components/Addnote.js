import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

function Addnote() {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description,note.tag);
    setNote({ title: "", description: "", tag: "" })
  }
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <form>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleChange} />
        </div>
        <button type="submit" disabled={note.title.length < 5 || note.description.length < 5 || note.tag.length < 5} className="btn btn-primary" onClick={handleClick}>Submit</button>
      </form>
    </div>
  )
}

export default Addnote;