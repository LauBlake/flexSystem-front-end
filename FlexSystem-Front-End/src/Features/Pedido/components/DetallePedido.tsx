import { useNavigate } from 'react-router-dom';
import './DetallePedido.css';
import { OrderDetailCard } from './OrderDetailCard.tsx';
import { useEffect, useState } from 'react';
import type { OrderInfo } from '../order.interface.ts';
import { orderService } from '../services/orderService.ts';

const DetallePedido = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderInfo[]>([]);

  useEffect(()=>{
    const fecthOrders = async () => {
          try {
              const orders = await orderService.searchOrders({});
              setOrders(orders);
          } catch (error) {
            console.log("No order found");
            setOrders([]);
          }
      }
      fecthOrders();
  },[]);

  const handleAgregarPedido = () => {
    navigate('/pedido');
  };

  const handleCancelar = () => {
    navigate('/pedido');
  };

  const handleContinuar = () => {
    if (orders.length === 0) {
      alert('No hay pedidos para procesar');
      return;
    }
    console.log('Procesar pedidos:', orders);
    alert('Pedidos procesados exitosamente');
  };

  const formatearImporte = (importe: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(importe);
  };

  return (
    <div className="detalle-pedido-container">
      <div className="detalle-pedido-card">
        <div className="detalle-pedido-header">
          <h1>Flexisur</h1>
          <p>Gestión de Pedidos de Mangueras</p>
        </div>
        
        <div className="detalle-pedido-main">
          {orders.length === 0 ? (
            <div className="empty-state">
              <p>No hay pedidos agregados</p>
              <button className="add-pedido-btn-large" onClick={handleAgregarPedido}>
                + Agregar Primer Pedido
              </button>
            </div>
          ) : (
            <>
              <div className="pedidos-list">
                {orders.map((order, index) => (
                  <OrderDetailCard id={index} orderInfo={order}></OrderDetailCard>
                ))}
              </div>
              
              <div className="add-pedido-section">
                <button className="add-pedido-btn" onClick={handleAgregarPedido}>
                  <span className="add-icon">+</span>
                </button>
              </div>
              
              <div className="summary-section">
                <div className="total-info">
                  <h3>Importe TOTAL: {formatearImporte(orders.reduce((sum: number, o: OrderInfo) => sum + parseFloat(o.amount ?? '0'), 0))}</h3>
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