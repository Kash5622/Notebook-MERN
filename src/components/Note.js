import React, { useContext, useEffect, useRef,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';

const Note = () => {
    const context = useContext(noteContext);
    const navigate=useNavigate();
    const { notes, getNote,updateNote } = context;
    useEffect(() => {
        if(localStorage.getItem('Auth-Token')){
            getNote();
        }
        else{
            navigate("/login");
        }       
    }, []);
    const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""});
    const ref = useRef(null)
    const closeref = useRef(null)
    const update = (currentnote) => {
        setNote({id:currentnote._id,etitle:currentnote.title, edescription:currentnote.description,etag:currentnote.tag})
        ref.current.click();
    }
    const handleClick=(e)=>{
        e.preventDefault();
        updateNote(note.id,note.etitle,note.edescription,note.etag);
        closeref.current.click();
    }
    const handleChange=(e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }
    return (
        <>
            <div>
                <button type="button" className="btn btn-primary d-none" ref={ref} data-toggle="modal" data-target="#exampleModal">
                    Launch demo modal
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={handleChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" ref={closeref} className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5 || note.etag.length<5 } onClick={handleClick} className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h1>Your Notes</h1>
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} update={update} />;
                })}

            </div>
        </>
    )
}

export default Note;