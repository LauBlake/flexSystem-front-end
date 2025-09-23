import React from "react";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
    return(
    <nav style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <Link to="/" style={{ margin: '0 15px', textDecoration: 'none' }}>
        Inicio
      </Link>
      <Link to="/login" style={{ margin: '0 15px', textDecoration: 'none' }}>
        Login
      </Link>
      <Link to="/register" style={{ margin: '0 15px', textDecoration: 'none' }}>
        Registro
      </Link>
    </nav>
    )
}

export default Navigation;