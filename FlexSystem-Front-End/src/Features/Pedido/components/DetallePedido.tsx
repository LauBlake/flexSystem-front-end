import { useNavigate, useLocation } from 'react-router-dom';
import './DetallePedido.css';
import { OrderDetailCard } from './OrderDetailCard.tsx';
import { useEffect, useState } from 'react';
import type { OrderEntity, HoseEntity } from '../order.interface.ts';
import { orderService } from '../services/orderService.ts';

type LocationState = { order?: OrderEntity } | undefined;
import { PageCard } from '../../../Core/components/PageCard.tsx';
import { SummarySection } from '../../../Core/components/SummarySection.tsx';

const DetallePedido = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as LocationState) || undefined;

  const [orders, setOrders] = useState<OrderEntity[]>([]);

  useEffect(() => {
    // Si venís desde "Ver", mostrar solo ese pedido
    if (state?.order) {
      setOrders([state.order]);
      return;
    }

    // Fallback: cargar pedidos normalmente
    const fetchOrders = async () => {
      try {
        const list = await orderService.searchOrders({});
        setOrders(Array.isArray(list) ? list : []);
      } catch (error) {
        console.log('No order found');
        setOrders([]);
      }
    };

    fetchOrders();
  }, [state?.order]);

  const handleAgregarPedido = () => {
    navigate('/pedido');
  };

  const handleCancelar = () => {
    navigate('/admin-pedidos');
  };

  const handleContinuar = () => {
    if (orders.length === 0) {
      alert('No hay pedidos para procesar');
      return;
    }
    console.log('Procesar pedidos:', orders);
    alert('Pedidos procesados exitosamente');
  };

  const formatearImporte = (importe: number) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(importe);

  // ---- helpers para totales (mismos que en OrderDetailCard) ----

  /** Normaliza cualquier valor (string/number) a number para operar precios/cantidades */
  const toNumber = (value: unknown): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (!trimmed) return 0;

      // Ej: "1.234,56" → "1234.56"
      const normalized = trimmed
        .replace(/\./g, '') // separador de miles
        .replace(',', '.'); // coma decimal a punto

      const parsed = Number(normalized);
      return Number.isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  /** Calcula el importe real de una manguera a partir de sus supplyHose */
  const getHoseTotal = (hose: HoseEntity): number => {
    const supplyHose = Array.isArray(hose.supplyHose) ? hose.supplyHose : [];

    return supplyHose.reduce((acc, sh) => {
      const price = toNumber(sh?.supply?.price); // SupplyEntity.price es string
      const amount = toNumber(sh?.amount);       // cantidad del insumo en esa manguera
      return acc + price * amount;
    }, 0);
  };

  // Total general de TODOS los pedidos, consistente con OrderDetailCard
  const totalGeneral = orders.reduce((orderAcc, order) => {
    const hoses: HoseEntity[] = Array.isArray(order.hoses) ? order.hoses : [];
    const orderTotal = hoses.reduce((acc, hose) => acc + getHoseTotal(hose), 0);
    return orderAcc + orderTotal;
  }, 0);

  return (
    <div className="detalle-pedido-container">
      <PageCard description='Gestión de Pedidos de Mangueras'>
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
                <OrderDetailCard key={index} id={index} OrderEntity={order} />
              ))}
            </div>

            <div className="add-pedido-section">
              <button className="add-pedido-btn" onClick={handleAgregarPedido}>
                <span className="add-icon">+</span>
              </button>
            </div>
            
            <SummarySection>
              <div className="total-info">
                <h3>
                  Importe TOTAL: {formatearImporte(totalGeneral)}
                </h3>
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
          </>
        )}
      </PageCard>
    </div>
  );
};

export default DetallePedido;
