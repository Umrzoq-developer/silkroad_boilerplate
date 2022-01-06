import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";

const Navbar = () => {
  return (
    <div className="navbar__layout">
      <Link to="/main">Main</Link>
      <Link to="math">Math</Link>
    </div>
  );
};

export default Navbar;
