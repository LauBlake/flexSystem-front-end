import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import {authService} from '../service/authService';

interface LoginFormData {
  email: string;
  password: string;
}

const FlexisurLogin: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);

const navigate = useNavigate();  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async () => {
    console.log('Login attempt:', formData);
    
    if(!formData.email || !formData.password){
      alert('Por favor, complete todos los campos.');
      return;
    }

    //validaciones

    //validaciones

    setIsLoading(true);
    try{
      console.log(formData)
      const response = await authService.login(formData)

      if(response.token){
        setTimeout(() => {
          window.location.href = '/pedido';
        },1000);
      }
      else{
        alert('Login failed: No token received');
      }
    }catch (error) {
      alert('Error during login: ' + (error as Error).message);
    }finally{
      setIsLoading(false);
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
                name="id"
                placeholder="Ingrese su Email"
                value={formData.email}
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
