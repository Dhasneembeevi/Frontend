import "./add.css"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddNote = () => {
  const [note, setNote] = useState({ title: "", content: "" });
  const Navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to add note to database
      await axios.post('https://note-taker-backend-dhasneem.onrender.com/note', {
        title: note.title,
        description: note.content
      });

      // Redirect to home page after successful submission
      Navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div id="add-container">
      <h2 id="note-head">Add Note</h2>
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
            value={note.content}
            onChange={(e) => setNote({ ...note, content: e.target.value })}
            required
          />
        </div>
        <button type="submit" id="note-add-btn">Add Note</button>
      </form>
    </div>
  );
};
export default AddNote;









