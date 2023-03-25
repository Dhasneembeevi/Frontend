import React from "react";
import { Link } from "react-router-dom";
import "./nav.css"
const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/addnote">Add Note</Link>
        </li>
        <li>
          <button>Delete All</button>
        </li>
        <li>
          <button>Export</button>
        </li>
        <li>
          <button>Logout</button>
        </li>
      </ul>
      <input type="text" placeholder="Search notes" />
    </nav>
  );
};
export default NavBar;




