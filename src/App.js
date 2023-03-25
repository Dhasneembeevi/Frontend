
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//import Navbar from './components/Navbar';
import Home from './components/Home';
import AddNote from './components/AddNote';
import NoteDetail from './components/NoteDetail';
import Login from './components/Login';
import Register from './components/Register';
import EditNote from './components/EditNote';
function App() {
  return (
    <Router>
      <div className="App">
      
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/addnote" element={ <AddNote /> } />
          <Route path="/notedetail/:noteId" element={ <NoteDetail /> } />
          <Route path="/" element={ <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notes/:id/edit" element={<EditNote/>} />

        </Routes>

      </div>
    </Router>
  );
}
export default App;





