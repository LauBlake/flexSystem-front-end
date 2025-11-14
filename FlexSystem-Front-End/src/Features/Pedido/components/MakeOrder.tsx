import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext.tsx';
import './MakeOrder.css';
import { authService } from '../../Users/service/authService.ts'; 
import { PageCard } from '../../../Core/components/PageCard.tsx';
import { ContentSection } from '../../../Core/components/ContentSection.tsx';
import { SummarySection } from '../../../Core/components/SummarySection.tsx';


interface Item {
  id: number;
  descripcion: string;
}






const MakeOrder = () => {
  const navigate = useNavigate();
  const { order, addHose } = useOrders();
  
  const [descripcionPedido, setDescripcionPedido] = useState('');
  const [canoSeleccionado, setCanoSeleccionado] = useState<Item | null>(null);
  const [camisaSeleccionada, setCamisaSeleccionada] = useState<Item | null>(null);
  
  // Arrays para las tuercas y agregados seleccionados (con índice único)
  interface ItemSeleccionado extends Item {
    indice: number;
  }
  const [tuercasSeleccionadas, setTuercasSeleccionadas] = useState<ItemSeleccionado[]>([]);
  const [agregadosSeleccionados, setAgregadosSeleccionados] = useState<ItemSeleccionado[]>([]);

  

  const calcularImporte = () => {
    let total = 0;
    if (canoSeleccionado) total += 5000;
    if (camisaSeleccionada) total += 3500;
    total += tuercasSeleccionadas.length * 1500;
    total += agregadosSeleccionados.length * 2000;
    return total;
  };

  const handleAddHose = () => {
    addHose({ length: 10, description: "", tubeId: 0, casingId: 0, screwId: 0, extra: []});
  }

  const handleCancelar = () => {
    setDescripcionPedido('');
    setCanoSeleccionado(null);
    setCamisaSeleccionada(null);
    setTuercasSeleccionadas([]);
    setAgregadosSeleccionados([]);
  };

  const handleContinuar = () => {
  };

  return (
    <div className="pedido-container">
      <PageCard description='Sistema de Gestión de Pedidos de Mangueras'>
        <div className='pedido-content'>
          <ContentSection>
            <h2>Detalles del pedido:</h2>
            {order.hoses.length ? order.hoses.map(ho => {

            }) : <></>}
            <div className="add-pedido-section">
              <button className="add-pedido-btn" onClick={handleAddHose}>
                <span className="add-icon">+</span>
              </button>
            </div>
          </ContentSection>

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