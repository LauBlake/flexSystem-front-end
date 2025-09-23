// register.tsx - Usando las clases CSS
import React, { useState } from 'react';
import './register.css';

const FlexisurRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    cuil: '',
    apellido: '',
    mail: '',
    direccion: '',
    telefono: '',
    numero: '',
    contrasenia: '',
    pisoOpcional: '',
    aclaraciones: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simular API call
    setTimeout(() => {
      console.log('Datos:', formData);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        {/* Header */}
        <div className="register-header">
          <h1>Flexisur</h1>
          <p>A Crear Cuenta</p>
        </div>

        {/* Form */}
        <section className="register-section">
          {/* Primera fila */}
          <div className="form-grid">
            <div className="input-group">
              <label className="input-label">
                👤 Ingresar tu Nombre <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Ingresar tu nombre"
                value={formData.nombre}
                onChange={handleInputChange('nombre')}
                required
              />
            </div>
            <div className="input-group">
              <label className="input-label">
                💳 Ingresar tu CUIL <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="XX-XXXXXXXX-X"
                value={formData.cuil}
                onChange={handleInputChange('cuil')}
                required
              />
            </div>
          </div>

          {/* Segunda fila */}
          <div className="form-grid">
            <div className="input-group">
              <label className="input-label">
                👤 Ingresar tu Apellido <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Ingresar tu apellido"
                value={formData.apellido}
                onChange={handleInputChange('apellido')}
                required
              />
            </div>
            <div className="input-group">
              <label className="input-label">
                📧 Ingresar tu Mail <span className="required">*</span>
              </label>
              <input
                type="email"
                className="form-input"
                placeholder="ejemplo@mail.com"
                value={formData.mail}
                onChange={handleInputChange('mail')}
                required
              />
            </div>
          </div>

          {/* Tercera fila */}
          <div className="form-grid">
            <div className="input-group">
              <label className="input-label">
                📍 Ingresar tu Dirección <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Ingresar tu dirección"
                value={formData.direccion}
                onChange={handleInputChange('direccion')}
                required
              />
            </div>
            <div className="input-group">
              <label className="input-label">
                📱 Ingresar tu Teléfono <span className="required">*</span>
              </label>
              <input
                type="tel"
                className="form-input"
                placeholder="+54 9 11 XXXX-XXXX"
                value={formData.telefono}
                onChange={handleInputChange('telefono')}
                required
              />
            </div>
          </div>

          {/* Cuarta fila */}
          <div className="form-grid">
            <div className="input-group">
              <label className="input-label">
                🏠 Ingresar tu Número <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Ingresar tu número"
                value={formData.numero}
                onChange={handleInputChange('numero')}
                required
              />
            </div>
            <div className="input-group">
              <label className="input-label">
                🔒 Ingresar tu Contraseña <span className="required">*</span>
              </label>
              <input
                type="password"
                className="form-input"
                placeholder="Mínimo 8 caracteres"
                value={formData.contrasenia}
                onChange={handleInputChange('contrasenia')}
                required
              />
            </div>
          </div>

          {/* Campos opcionales */}
          <div className="form-grid-single">
            <div className="input-group">
              <label className="input-label">
                🏢 Ingresar tu piso (opcional)
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Piso (opcional)"
                value={formData.pisoOpcional}
                onChange={handleInputChange('pisoOpcional')}
              />
            </div>
          </div>

          <div className="form-grid-single">
            <div className="input-group">
              <label className="input-label">
                📝 Ingresar aclaraciones (opcional)
              </label>
              <textarea
                className="form-textarea"
                placeholder="Aclaraciones adicionales"
                value={formData.aclaraciones}
                onChange={handleInputChange('aclaraciones')}
                rows={3}
              />
            </div>
          </div>

          {/* Botones */}
          <div className="button-container">
            <button
              type="button"
              className="btn-primary"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading && <div className="loading-spinner"></div>}
              {isLoading ? 'Creando Cuenta...' : 'Crear Cuenta'}
            </button>
            
            <button
              type="button"
              className="btn-secondary"
              onClick={() => console.log('Ir a login')}
            >
              Iniciar Sesión
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FlexisurRegister;