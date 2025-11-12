import { useNavigate, useLocation } from 'react-router-dom';
import './DetallePedido.css';
import { OrderDetailCard } from './OrderDetailCard.tsx';
import { useEffect, useState } from 'react';
import type { OrderInfo } from '../order.interface.ts';
import { orderService } from '../services/orderService.ts';

type LocationState = { order?: OrderInfo } | undefined;
import { PageCard } from '../../../Core/components/PageCard.tsx';
import { SummarySection } from '../../../Core/components/SummarySection.tsx';

const DetallePedido = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as LocationState) || undefined;

  const [orders, setOrders] = useState<OrderInfo[]>([]);

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

  // ---- helpers para totales ----
  const parseAmount = (a: unknown): number => {
    if (typeof a === 'number') return a;
    if (typeof a === 'string') return parseFloat(a) || 0;
    return 0;
  };

  const sumHoses = (hoses: { ammount?: unknown }[] | undefined): number =>
    (hoses ?? []).reduce((acc, h) => acc + (Number(h.ammount) || 0), 0);

  // total general robusto: usa order.amount si > 0; si no, suma hoses
  const totalGeneral = orders.reduce((sum, o) => {
    const monto = parseAmount(o.amount);
    const totalOrder = monto > 0 ? monto : sumHoses(o.hoses);
    return sum + totalOrder;
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
                  <OrderDetailCard key={index} id={index} orderInfo={order} />
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