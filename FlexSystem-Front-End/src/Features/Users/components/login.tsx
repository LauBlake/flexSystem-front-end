import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import {authService} from '../service/authService';
import { useAuth } from '../context/AuthContext';
import { PageCard } from '../../../Core/components/PageCard.tsx';
import { TextInput } from '../../../Core/components/TextInput.tsx';
import { PasswordInput } from '../../../Core/components/PasswordInput.tsx';

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

    try{
      console.log(formData)
      const response = await authService.login(formData)

      if(!response.access_token){
        alert('Login failed: No token received');
        throw new Error("No token received");
      }
      login(response.access_token);
        
      console.log('Login Successful', authService.getUserInfo())
        
      const userInfo = authService.getUserInfo();
      if (userInfo && userInfo.role.includes('admin')) {
        navigate('/admin-pedidos');
      } else if (userInfo && userInfo.role.includes('client')) {
        navigate('/detalle-pedido');
      }
    } catch (error) {
      alert('Error during login: ' + (error as Error).message);
    }
  };


  const handleCreateAccount = () => {
    console.log('Navigate to create account');
    navigate('/register');
    // Aquí iría la navegación a crear cuenta
  };

  return (
    <div className="login-container">
      <PageCard description='Bienvenido a la página de Flexisur'>

        {/* Login Form */}
        <div className="login-form-section">
          <h2 className="form-title">
            Inicio de Sesión
          </h2>

          <div className="form-inputs">
            {/* ID Input */}
            <TextInput 
              name='username' 
              value={formData.username} 
              setValue={handleInputChange} 
              placeholder='Ingrese su nombre de usuario.'
            />
            

            {/* Password Input */}
            <PasswordInput 
              name='password' 
              value={formData.password} 
              setValue={handleInputChange} 
              placeholder='Ingrese su contraseña'
            />
      
      
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
      </PageCard>
    </div>
  );
};

export default FlexisurLogin;
