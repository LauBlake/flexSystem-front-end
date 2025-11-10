import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import {authService} from '../service/authService';
import { useAuth } from '../context/AuthContext';

interface LoginFormData {
  username: string;
  password: string;
}

const FlexisurLogin: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: ''
  });

  const navigate = useNavigate();
  const { login: ctxLogin } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async () => {
    if (!formData.username || !formData.password) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    try {
      const response = await authService.login(formData);
      if (!response?.access_token) throw new Error('No token received');

      const userInfo = ctxLogin(response.access_token); // ahora devuelve JWTPayLoad | null
      const role = String(userInfo?.role ?? '').toLowerCase();

      if (role === 'admin') {
        navigate('/admin-pedidos', { replace: true });
      } else if (role === 'client') {
        navigate('/admin-pedidos', { replace: true });
      } else {
        navigate('/', { replace: true }); // fallback
      }
    } catch (err: any) {
      alert('Error during login: ' + err.message);
    }
  };


  const handleCreateAccount = () => {
    console.log('Navigate to create account');
    navigate('/register');
    // Aquí iría la navegación a crear cuenta
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <h1 className="login-title">Flexisur</h1>
          <p className="login-subtitle">Bienvenido a la página de Flexisur</p>
          <div className="login-divider"></div>
        </div>

        {/* Login Form */}
        <div className="login-form-section">
          <h2 className="form-title">
            Inicio de Sesión
          </h2>

          <div className="form-inputs">
            {/* ID Input */}
            <div>
              <input
                type="text"
                name="username"
                placeholder="Ingrese su nombre de usuario"
                value={formData.username}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Ingrese su contraseña"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            {/* Action Buttons */}
            <div className="form-buttons">
              <button
                onClick={handleLogin}
                className="form-button"
              >
                Iniciar Sesion
                <svg 
                  className="button-icon" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <button
                onClick={handleCreateAccount}
                className="form-button"
              >
                Crear Cuenta
                <svg 
                  className="button-icon" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="login-footer">
          <p className="footer-copyright">
            © 2023 Flexisur. Todos los derechos reservados.
          </p>
          
          {/* Social Links */}
          <div className="social-links">
            <a href="#" className="social-link">
              Facebook
            </a>
            <a href="#" className="social-link">
              Instagram
            </a>
            <a href="#" className="social-link">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlexisurLogin;
