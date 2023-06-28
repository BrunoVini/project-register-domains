import React from "react";
import { Link } from "react-router-dom";
import * as C from "./styles";
import { handleLogout } from "../../hooks/auth";

const Header = () => {
  return (
    <header style={C.header}>
      <Link to="/home">
        <img src="/logo.svg" alt="Logo" style={C.logo} />
      </Link>
      <button style={C.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
