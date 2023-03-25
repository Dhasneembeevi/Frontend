import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Home.css"
const Home = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    axios.get('https://note-taker-backend-dhasneem.onrender.com/notes')
      .then(res => {
        setNotes(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const handleDeleteAll = async () => {
    try {
      await axios.delete('https://note-taker-backend-dhasneem.onrender.com/notes');
      setNotes([]);
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleDelete = async (noteId) => {
    try {
      await fetch(`https://note-taker-backend-dhasneem.onrender.com/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          
        }
      });
      setNotes(notes.filter(note => note._id !== noteId));
    } catch (err) {
      console.error(err);
    }
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const filteredNotes = notes.filter(note => {
    return (
      (note.title && note.title.toLowerCase().includes(search.toLowerCase())) || 
      (note.description && note.description.toLowerCase().includes(search.toLowerCase()))
    );
  });
  
  return (
    <div id='home-container'>
      <nav id='top-navbar'>
        <ul id='head'>
          <li id='home-li'><Link to="/">Home</Link></li>
          <li id='add-li'><Link to="/addnote">Add Note</Link></li>
          <li id='deleteall'><button onClick={handleDeleteAll}>Delete All</button></li>
          <li id='export'><button>Export</button></li>
          <li id='logout'><Link to="/">Logout</Link></li>
        </ul>
      </nav>
      <input type="text" value={search} onChange={handleSearch} placeholder="Search notes" id='search' />
      <ul>
      {filteredNotes.map(note => (
        <li key={note._id} id="notes-list">
          <Link to={`https://note-taker-backend-dhasneem.onrender.com/notes/${note._id}`} style={{ textDecoration: 'none' }}>
          <h3 style={{ color: 'black' }}>{note.title}</h3>

          <p id='description' style={{ color: 'black' }}>{note.description ? note.description.substring(0, 50) : ''}...</p>


          </Link>
          <button onClick={() => handleDelete(note._id)} id="delete-btn">Delete</button>
          <Link to={`/notes/${note._id}/edit`}>
  <button id='edit-button'>Edit</button>
</Link>

        </li>
      ))}
      </ul>
    </div>
  );
};
export default Home;









