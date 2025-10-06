import { useState, useEffect } from 'react';
import './Pedido.css';

interface Item {
  id: number;
  descripcion: string;
}

const Pedido = () => {
  const [descripcionPedido, setDescripcionPedido] = useState('');
  const [canos, setCanos] = useState<Item[]>([]);
  const [camisas, setCamisas] = useState<Item[]>([]);
  const [tuercas, setTuercas] = useState<Item[]>([]);
  const [agregados, setAgregados] = useState<Item[]>([]);
  
  // Estados para los items seleccionados en el resumen
  const [resumenItems, setResumenItems] = useState<{
    canos: Item[];
    camisas: Item[];
    tuercas: Item[];
    agregados: Item[];
  }>({
    canos: [],
    camisas: [],
    tuercas: [],
    agregados: []
  });

  // Simulación de datos de API (en una implementación real, estos vendrían de llamadas a la API)
  useEffect(() => {
    // Simular llamada a API para caños
    setCanos([
      { id: 1, descripcion: "Caño tipo A" },
      { id: 2, descripcion: "Caño tipo B" },
      { id: 3, descripcion: "Caño tipo C" }
    ]);

    // Simular llamada a API para camisas
    setCamisas([
      { id: 1, descripcion: "Camisa estándar" },
      { id: 2, descripcion: "Camisa reforzada" },
      { id: 3, descripcion: "Camisa flexible" }
    ]);

    // Simular llamada a API para tuercas
    setTuercas([
      { id: 1, descripcion: "Tuerca 1: 5xxxx" },
      { id: 2, descripcion: "Tuerca 2: 8xxxx" }
    ]);

    // Simular llamada a API para agregados
    setAgregados([
      { id: 1, descripcion: "Agregado 1: 5xxxx" },
      { id: 2, descripcion: "Agregado 2: 8xxxx" }
    ]);
  }, []);

  const handleBuscar = (tipo: string) => {
    // Simular búsqueda
    console.log(`Buscando en ${tipo}`);
  };

  const handleCancelar = () => {
    // Lógica para cancelar
    console.log('Cancelar pedido');
  };

  const handleContinuar = () => {
    // Lógica para continuar
    console.log('Continuar con el pedido');
  };

  return (
    <div className="pedido-container">
      <div className="pedido-card">
        <div className="pedido-header">
          <h1>Flexisur</h1>
          <p>Sistema de Gestión de Pedidos de Mangueras</p>
        </div>
        
        <div className="pedido-main">
          <div className="pedido-content">
            <div className="detalles-section">
              <h2>Detalles del pedido:</h2>
              
              <div className="detalle-item">
                <label className="detalle-label">Caño:</label>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <select className="detalle-select">
                    <option value="">Descripción</option>
                    {canos.map(cano => (
                      <option key={cano.id} value={cano.id}>{cano.descripcion}</option>
                    ))}
                  </select>
                  <button className="buscar-btn" onClick={() => handleBuscar('caño')}>
                    Buscar
                  </button>
                </div>
              </div>

              <div className="detalle-item">
                <label className="detalle-label">Camisas:</label>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <select className="detalle-select">
                    <option value="">Descripción</option>
                    {camisas.map(camisa => (
                      <option key={camisa.id} value={camisa.id}>{camisa.descripcion}</option>
                    ))}
                  </select>
                  <button className="buscar-btn" onClick={() => handleBuscar('camisas')}>
                    Buscar
                  </button>
                </div>
              </div>

              <div className="detalle-item">
                <label className="detalle-label">Tuercas:</label>
                <div className="tuercas-container">
                  <select className="detalle-select">
                    <option value="">Descripción</option>
                    {tuercas.map(tuerca => (
                      <option key={tuerca.id} value={tuerca.id}>{tuerca.descripcion}</option>
                    ))}
                  </select>
                  <div className="tuerca-buttons">
                    <button className="buscar-btn" onClick={() => handleBuscar('tuercas')}>
                      Buscar
                    </button>
                    <button className="cantidad-btn">2x</button>
                  </div>
                </div>
                <div className="segunda-tuerca">
                  <select className="detalle-select">
                    <option value="">Descripción</option>
                    {tuercas.map(tuerca => (
                      <option key={tuerca.id} value={tuerca.id}>{tuerca.descripcion}</option>
                    ))}
                  </select>
                  <div className="tuerca-buttons">
                    <button className="buscar-btn" onClick={() => handleBuscar('tuercas')}>
                      Buscar
                    </button>
                    <button className="cantidad-btn">2x</button>
                  </div>
                </div>
                <div className="dots">...</div>
              </div>

              <div className="detalle-item">
                <label className="detalle-label">Agregados:</label>
                <div className="agregados-container">
                  <select className="detalle-select">
                    <option value="">Descripción</option>
                    {agregados.map(agregado => (
                      <option key={agregado.id} value={agregado.id}>{agregado.descripcion}</option>
                    ))}
                  </select>
                  <div className="agregado-buttons">
                    <button className="buscar-btn" onClick={() => handleBuscar('agregados')}>
                      Buscar
                    </button>
                    <button className="cantidad-btn">2x</button>
                  </div>
                </div>
                <div className="dots">...</div>
              </div>
            </div>

            <div className="descripcion-section">
              <h3>Descripción:</h3>
              <textarea
                className="descripcion-textarea"
                value={descripcionPedido}
                onChange={(e) => setDescripcionPedido(e.target.value)}
                placeholder="Se puede explicar los detalles del pedido explicando el uso que se le dará de manera que permita asesorar mejor el pedido."
              />
            </div>
          </div>

          <div className="resumen-section">
            <h3>Resumen del pedido:</h3>
            <div className="resumen-items">
              <div className="resumen-item">Importe del caño: $5,000</div>
              <div className="resumen-item">Importe de la camisa: $3,500</div>
              <div className="resumen-item">Importe de las tuercas:</div>
              <div className="resumen-subitem">Tuerca 1: $1,200</div>
              <div className="resumen-subitem">Tuerca 2: $1,800</div>
              <div className="resumen-item">Importe de los agregados:</div>
              <div className="resumen-subitem">Agregado 1: $2,500</div>
              <div className="resumen-subitem">Agregado 2: $1,700</div>
            </div>
            
            <div className="importe-total">
              <strong>Importe Total: $15,700</strong>
            </div>
            
            <div className="action-buttons">
              <button className="cancelar-btn" onClick={handleCancelar}>
                Cancelar
              </button>
              <button className="continuar-btn" onClick={handleContinuar}>
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pedido;