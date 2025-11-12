import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePedidos } from '../context/PedidoContext.tsx';
import './Pedido.css';
import { authService } from '../../Users/service/authService.ts'; 
import { PageCard } from '../../../Core/components/PageCard.tsx';
import { ContentSection } from '../../../Core/components/ContentSection.tsx';
import { SummarySection } from '../../../Core/components/SummarySection.tsx';

interface Item {
  id: number;
  descripcion: string;
}






const MakeOrder = () => {
  console.log('User Info:', authService.getUserInfo())
  
  const navigate = useNavigate();
  const { agregarPedido } = usePedidos();
  
  const [descripcionPedido, setDescripcionPedido] = useState('');
  const [canoSeleccionado, setCanoSeleccionado] = useState<Item | null>(null);
  const [camisaSeleccionada, setCamisaSeleccionada] = useState<Item | null>(null);
  
  // Arrays para las tuercas y agregados seleccionados (con índice único)
  interface ItemSeleccionado extends Item {
    indice: number;
  }
  const [tuercasSeleccionadas, setTuercasSeleccionadas] = useState<ItemSeleccionado[]>([]);
  const [agregadosSeleccionados, setAgregadosSeleccionados] = useState<ItemSeleccionado[]>([]);
  const [contadorTuercas, setContadorTuercas] = useState(0);
  const [contadorAgregados, setContadorAgregados] = useState(0);
  
  const [canos, setCanos] = useState<Item[]>([]);
  const [camisas, setCamisas] = useState<Item[]>([]);
  const [tuercas, setTuercas] = useState<Item[]>([]);
  const [agregados, setAgregados] = useState<Item[]>([]);

  

  const calcularImporte = () => {
    let total = 0;
    if (canoSeleccionado) total += 5000;
    if (camisaSeleccionada) total += 3500;
    total += tuercasSeleccionadas.length * 1500;
    total += agregadosSeleccionados.length * 2000;
    return total;
  };

  const handleBuscar = (tipo: string) => {
    navigate("./supply-search");
  };

  const handleCancelar = () => {
    setDescripcionPedido('');
    setCanoSeleccionado(null);
    setCamisaSeleccionada(null);
    setTuercasSeleccionadas([]);
    setAgregadosSeleccionados([]);
  };

  const handleContinuar = () => {
    if (!canoSeleccionado || !camisaSeleccionada || tuercasSeleccionadas.length === 0) {
      alert('Por favor, complete todos los campos obligatorios (Caño, Camisa y al menos una Tuerca)');
      return;
    }

    if (!descripcionPedido.trim()) {
      alert('Por favor, ingrese una descripción del pedido');
      return;
    }

    const nuevoPedido = {
      cano: canoSeleccionado,
      camisa: camisaSeleccionada,
      tuercas: tuercasSeleccionadas.map((t) => ({ ...t, cantidad: 1 })),
      agregados: agregadosSeleccionados.map((a) => ({ ...a, cantidad: 1 })),
      descripcion: descripcionPedido,
      importe: calcularImporte()
    };

    agregarPedido(nuevoPedido);
    alert('Pedido agregado exitosamente');
    handleCancelar();
    navigate('/detalle-pedido');
  };

  const handleCanoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cano = canos.find(c => c.id === parseInt(e.target.value));
    setCanoSeleccionado(cano || null);
  };

  const handleCamisaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const camisa = camisas.find(c => c.id === parseInt(e.target.value));
    setCamisaSeleccionada(camisa || null);
  };

  const handleAgregarTuerca = () => {
    if (tuercas.length > 0) {
      const nuevaTuerca: ItemSeleccionado = {
        ...tuercas[0],
        indice: contadorTuercas
      };
      setTuercasSeleccionadas(prev => [...prev, nuevaTuerca]);
      setContadorTuercas(prev => prev + 1);
    }
  };

  const handleEliminarTuerca = (indice: number) => {
    setTuercasSeleccionadas(prev => prev.filter(t => t.indice !== indice));
  };

  const handleCambiarTuerca = (indice: number, nuevoId: number) => {
    const tuercaSeleccionada = tuercas.find(t => t.id === nuevoId);
    if (tuercaSeleccionada) {
      setTuercasSeleccionadas(prev => 
        prev.map(t => t.indice === indice ? { ...tuercaSeleccionada, indice } : t)
      );
    }
  };

  const handleAgregarAgregado = () => {
    if (agregados.length > 0) {
      const nuevoAgregado: ItemSeleccionado = {
        ...agregados[0],
        indice: contadorAgregados
      };
      setAgregadosSeleccionados(prev => [...prev, nuevoAgregado]);
      setContadorAgregados(prev => prev + 1);
    }
  };

  const handleEliminarAgregado = (indice: number) => {
    setAgregadosSeleccionados(prev => prev.filter(a => a.indice !== indice));
  };

  const handleCambiarAgregado = (indice: number, nuevoId: number) => {
    const agregadoSeleccionado = agregados.find(a => a.id === nuevoId);
    if (agregadoSeleccionado) {
      setAgregadosSeleccionados(prev => 
        prev.map(a => a.indice === indice ? { ...agregadoSeleccionado, indice } : a)
      );
    }
  };

  return (
    <div className="pedido-container">
      <PageCard description='Sistema de Gestión de Pedidos de Mangueras'>
        <ContentSection>
            <div className="detalles-section">
              <h2>Detalles del pedido:</h2>
              
              <div className="detalle-item">
                <label className="detalle-label">Caño:</label>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <select 
                    className="detalle-select"
                    value={canoSeleccionado?.id || ''}
                    onChange={handleCanoChange}
                  >
                    <option value="">Seleccione un caño</option>
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
                  <select 
                    className="detalle-select"
                    value={camisaSeleccionada?.id || ''}
                    onChange={handleCamisaChange}
                  >
                    <option value="">Seleccione una camisa</option>
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
                {tuercasSeleccionadas.map((tuercaSeleccionada) => (
                  <div key={tuercaSeleccionada.indice} className="tuercas-container">
                    <select 
                      className="detalle-select"
                      value={tuercaSeleccionada.id}
                      onChange={(e) => handleCambiarTuerca(tuercaSeleccionada.indice, parseInt(e.target.value))}
                    >
                      {tuercas.map(tuerca => (
                        <option key={tuerca.id} value={tuerca.id}>{tuerca.descripcion}</option>
                      ))}
                    </select>
                    <div className="tuerca-buttons">
                      <button className="buscar-btn" onClick={() => handleBuscar(`tuerca-${tuercaSeleccionada.id}`)}>
                        Buscar
                      </button>
                      <button 
                        className="cantidad-btn remove-btn"
                        onClick={() => handleEliminarTuerca(tuercaSeleccionada.indice)}
                        title="Eliminar tuerca"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
                <button className="add-item-btn" onClick={handleAgregarTuerca}>
                  + Agregar Tuerca
                </button>
              </div>

              <div className="detalle-item">
                <label className="detalle-label">Agregados:</label>
                {agregadosSeleccionados.map((agregadoSeleccionado) => (
                  <div key={agregadoSeleccionado.indice} className="agregados-container">
                    <select 
                      className="detalle-select"
                      value={agregadoSeleccionado.id}
                      onChange={(e) => handleCambiarAgregado(agregadoSeleccionado.indice, parseInt(e.target.value))}
                    >
                      {agregados.map(agregado => (
                        <option key={agregado.id} value={agregado.id}>{agregado.descripcion}</option>
                      ))}
                    </select>
                    <div className="agregado-buttons">
                      <button className="buscar-btn" onClick={() => handleBuscar(`agregado-${agregadoSeleccionado.id}`)}>
                        Buscar
                      </button>
                      <button 
                        className="cantidad-btn remove-btn"
                        onClick={() => handleEliminarAgregado(agregadoSeleccionado.indice)}
                        title="Eliminar agregado"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
                <button className="add-item-btn" onClick={handleAgregarAgregado}>
                  + Agregar Agregado
                </button>
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
          </ContentSection>

          <SummarySection>
            <h3>Resumen del pedido:</h3>
            <div className="resumen-items">
              <div className="resumen-item">
                <span>Importe del caño:</span>
                <span>{canoSeleccionado ? '$5,000' : '$0'}</span>
              </div>
              <div className="resumen-item">
                <span>Importe de la camisa:</span>
                <span>{camisaSeleccionada ? '$3,500' : '$0'}</span>
              </div>
              {tuercasSeleccionadas.length > 0 && (
                <div className="resumen-item">
                  <span>Importe de las tuercas:</span>
                  <div className="resumen-subitems">
                    {tuercasSeleccionadas.map((tuerca) => (
                      <div key={tuerca.id} className="resumen-subitem">
                        <span>{tuerca.descripcion}:</span>
                        <span>$1,500</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {agregadosSeleccionados.length > 0 && (
                <div className="resumen-item">
                  <span>Importe de los agregados:</span>
                  <div className="resumen-subitems">
                    {agregadosSeleccionados.map((agregado) => (
                      <div key={agregado.id} className="resumen-subitem">
                        <span>{agregado.descripcion}:</span>
                        <span>$2,000</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="importe-total">
              <strong>Importe: ${calcularImporte().toLocaleString('es-AR')}</strong>
            </div>
            
            <div className="action-buttons">
              <button className="cancelar-btn" onClick={handleCancelar}>
                Cancelar
              </button>
              <button className="continuar-btn" onClick={handleContinuar}>
                Continuar
              </button>
            </div>
          </SummarySection>
      </PageCard>
    </div>
  );
};

export default MakeOrder;