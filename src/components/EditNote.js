import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "./EditNote.css"

const EditNote = () => {
  const [note, setNote] = useState({ title: "", description: "" });
  const navigate = useNavigate();
  const { id } = useParams();
  
  useEffect(() => {
    axios.get(`https://note-taker-backend-dhasneem.onrender.com/notes/${id}`)
      .then(res => {
        setNote({
          title: res.data.title,
          description: res.data.description,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://note-taker-backend-dhasneem.onrender.com/notes/${id}`, note);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="edit-container">
      <h2 id="note-head">Edit Note</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label id="title-label">Title:</label>
          <input id="notes"
            type="text"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label id="desc-label">Note Content:</label>
          <textarea id="description-note"
            value={note.description}
            onChange={(e) => setNote({ ...note, description: e.target.value })}
            required
          />
        </div>
        <button type="submit" id="note-edit-btn">Update Note</button>
      </form>
    </div>
  );
};

export default EditNote;
