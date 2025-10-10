import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePedidos } from '../context/PedidoContext';
import './DetallePedido.css';

const DetallePedido = () => {
  const navigate = useNavigate();
  const { pedidos, eliminarPedido } = usePedidos();
  const [expandedPedido, setExpandedPedido] = useState<number | null>(null);

  const toggleExpanded = (pedidoId: number) => {
    setExpandedPedido(expandedPedido === pedidoId ? null : pedidoId);
  };

  const handleVerDetalle = (pedidoId: number) => {
    toggleExpanded(pedidoId);
  };

  const handleAgregarPedido = () => {
    navigate('/pedido');
  };

  const handleEliminarPedido = (pedidoId: number) => {
    if (window.confirm('¿Está seguro que desea eliminar este pedido?')) {
      eliminarPedido(pedidoId);
    }
  };

  const handleCancelar = () => {
    navigate('/pedido');
  };

  const handleContinuar = () => {
    if (pedidos.length === 0) {
      alert('No hay pedidos para procesar');
      return;
    }
    console.log('Procesar pedidos:', pedidos);
    alert('Pedidos procesados exitosamente');
  };

  const formatearImporte = (importe: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(importe);
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'pendiente': return '#f59e0b';
      case 'procesando': return '#3b82f6';
      case 'completado': return '#10b981';
      case 'cancelado': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="detalle-pedido-container">
      <div className="detalle-pedido-card">
        <div className="detalle-pedido-header">
          <h1>Flexisur</h1>
          <p>Gestión de Pedidos de Mangueras</p>
        </div>
        
        <div className="detalle-pedido-main">
          {pedidos.length === 0 ? (
            <div className="empty-state">
              <p>No hay pedidos agregados</p>
              <button className="add-pedido-btn-large" onClick={handleAgregarPedido}>
                + Agregar Primer Pedido
              </button>
            </div>
          ) : (
            <>
              <div className="pedidos-list">
                {pedidos.map((pedido) => (
              <div key={pedido.id} className="pedido-item">
                <div className="pedido-summary">
                  <div className="pedido-info">
                    <div className="pedido-componentes">
                      <div className="componente-line">
                        <span className="componente-label">Camisa:</span>
                        <span className="componente-valor">{pedido.camisa?.descripcion || '--------'}</span>
                      </div>
                      <div className="componente-line">
                        <span className="componente-label">Caño:</span>
                        <span className="componente-valor">{pedido.cano?.descripcion || '--------'}</span>
                      </div>
                      <div className="componente-line">
                        <span className="componente-label">Tuercas:</span>
                        <span className="componente-valor">
                          {pedido.tuercas.map(t => `${t.descripcion}`).join(', ') || '--------'}
                        </span>
                      </div>
                      {pedido.agregados.length > 0 && (
                        <div className="componente-line agregados-link">
                          <span className="componente-label">+ {pedido.agregados.length} agregados</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="pedido-details">
                    <div className="descripcion-section">
                      <h4>Descripción:</h4>
                      <p>{pedido.descripcion}</p>
                    </div>
                  </div>
                  
                  <div className="pedido-actions">
                    <div className="importe-info">
                      <span className="importe-label">Importe:</span>
                      <span className="importe-valor">{formatearImporte(pedido.importe)}</span>
                    </div>
                    <div className="estado-badge" style={{ backgroundColor: getEstadoColor(pedido.estado) }}>
                      {pedido.estado.charAt(0).toUpperCase() + pedido.estado.slice(1)}
                    </div>
                    <button 
                      className="ver-btn" 
                      onClick={() => handleVerDetalle(pedido.id)}
                    >
                      ⚙️ Ver
                    </button>
                    <button 
                      className="eliminar-btn" 
                      onClick={() => handleEliminarPedido(pedido.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                
                {expandedPedido === pedido.id && (
                  <div className="pedido-expanded">
                    <div className="expanded-content">
                      <h4>Detalles Completos:</h4>
                      <div className="detalles-grid">
                        <div className="detalle-group">
                          <h5>Componentes:</h5>
                          <ul>
                            <li>Camisa: {pedido.camisa?.descripcion || 'No seleccionado'}</li>
                            <li>Caño: {pedido.cano?.descripcion || 'No seleccionado'}</li>
                            {pedido.tuercas.map((tuerca, index) => (
                              <li key={tuerca.id}>
                                Tuerca {index + 1}: {tuerca.descripcion} (Cant: {tuerca.cantidad || 1})
                              </li>
                            ))}
                            {pedido.agregados.map((agregado, index) => (
                              <li key={agregado.id}>
                                Agregado {index + 1}: {agregado.descripcion} (Cant: {agregado.cantidad || 1})
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="detalle-group">
                          <h5>Información del Pedido:</h5>
                          <p><strong>Fecha:</strong> {pedido.fechaCreacion.toLocaleDateString('es-AR')}</p>
                          <p><strong>Estado:</strong> {pedido.estado}</p>
                          <p><strong>Total:</strong> {formatearImporte(pedido.importe)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
              </div>
              
              <div className="add-pedido-section">
                <button className="add-pedido-btn" onClick={handleAgregarPedido}>
                  <span className="add-icon">+</span>
                </button>
              </div>
              
              <div className="summary-section">
                <div className="total-info">
                  <h3>Importe TOTAL: {formatearImporte(pedidos.reduce((sum, p) => sum + p.importe, 0))}</h3>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetallePedido;