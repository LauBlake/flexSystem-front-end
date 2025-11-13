import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Features/Users/context/AuthContext";

const getFeedForUser = (role: string) => {
  switch(role)
  {
    default:
    case 'client':
      return (
        <>
          <Link to="/pedido" style={{ margin: '0 15px', textDecoration: 'none', color: 'white' }}>
              Crear Pedido
          </Link>
          <Link to="/detalle-pedido" style={{ margin: '0 15px', textDecoration: 'none', color: 'white' }}>
            Detalle Pedidos
          </Link>
        </>
      );
    case 'admin':
      return (
        <>
        <Link to="/admin-pedidos" style={{ margin: '0 15px', textDecoration: 'none', color: 'white' }}>
          Admin Pedidos
        </Link>
        <Link to="/dealer/create" style={{ margin: '0 15px', textDecoration: 'none', color: 'white' }}>
          Crear Dealer
        </Link>
      </>
      );
  }
}


const Navigation: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
      logout();
      navigate('/login');
    };

    return(
    <nav style={{ 
      padding: '20px', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <Link to="/" style={{ margin: '0 15px', textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>
          Flexisur
        </Link>
        {isAuthenticated && (
          getFeedForUser(user?.role[0] ?? "")
        )}
      </div>
      <div>
        {isAuthenticated ? (
          <>
            <span style={{ margin: '0 15px', color: 'white' }}>
              {user?.name || user?.mail}
            </span>
            <button 
              onClick={handleLogout}
              style={{
                margin: '0 15px',
                padding: '8px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '1px solid white',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ margin: '0 15px', textDecoration: 'none', color: 'white' }}>
              Login
            </Link>
            <Link to="/register" style={{ margin: '0 15px', textDecoration: 'none', color: 'white' }}>
              Registro
            </Link>
          </>
        )}
      </div>
    </nav>
    )
}

export default Navigation;  