import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Features/Users/context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ 
          color: 'white', 
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          Cargando...
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // TODO: Descomentar cuando el backend maneje roles correctamente
  // Si se requiere un rol específico y el usuario no lo tiene, redirigir a home
  // if (requiredRole && user?.role !== requiredRole) {
  //   return <Navigate to="/" replace />;
  // }

  // TEMPORALMENTE: Permitir acceso a todos los usuarios autenticados
  console.log('User role:', user?.role, 'Required role:', requiredRole);

  // Si pasa todas las validaciones, mostrar el contenido
  return <>{children}</>;
};
