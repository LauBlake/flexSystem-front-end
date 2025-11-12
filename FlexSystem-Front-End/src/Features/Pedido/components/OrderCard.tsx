import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { OrderInfo } from '../order.interface';
import { orderService } from '../services/orderService';
import { useAuth } from '../../Users/context/AuthContext.tsx';


const formatDateTime = (d: string | Date) => {
  const date = typeof d === 'string' ? new Date(d) : d;
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' });
};

const getStateColor = (estado: string) => {
  switch (estado) {
    case 'Pending':    return '#ff6b6b';
    case 'InProcess':  return '#4ecdc4';
    case 'OnTheWay':   return '#95e1d3';
    case 'Delivered':  return '#51cf66';
    case 'Payed':      return '#00b341';
    default:           return '#868e96';
  }
};

const normRole = (r?: unknown) => String(r ?? '').toLowerCase();

export const OrderCard = ({ rowKey, orderInfo }: { rowKey: number; orderInfo: OrderInfo }) => {
  const navigate = useNavigate();
  const { user } = useAuth();                         // 👈 trae el usuario del contexto
  const isAdmin = normRole(user?.role) === 'admin';   // 👈 check de rol

  const [saving, setSaving] = useState(false);

  const seeDetailsHandle = (order: OrderInfo) => {
    navigate('/detalle-pedido', { state: { order } });
  };

  const handleStart = async () => {
    try {
      setSaving(true);
      await orderService.setInProcess(orderInfo.orderId);
      navigate(0); // refresca para ver el nuevo estado
    } catch (e: any) {
      alert(e.message || 'No se pudo cambiar a InProcess');
    } finally {
      setSaving(false);
    }
  };

  return (
    <tr key={rowKey}>
      <td>{orderInfo.orderId}</td>

      <td>
        <span className="estado-badge" style={{ backgroundColor: getStateColor(orderInfo.state) }}>
          {orderInfo.state}
        </span>
      </td>

      <td>{formatDateTime(orderInfo.orderDate)}</td>

      <td className="importe-cell">
        ${typeof orderInfo.amount === 'number' ? orderInfo.amount : parseFloat(orderInfo.amount ?? '0') || 0}
      </td>

      <td className="acciones-cell" style={{ display: 'flex', gap: 8 }}>
        {/* 👇 Solo admin + Pending */}
        {isAdmin && orderInfo.state === 'Pending' && (
          <button
            type="button"
            disabled={saving}
            className="btn-iniciar"
            onClick={handleStart}
            title="Pasar a InProcess"
          >
            {saving ? '...' : 'Iniciar'}
          </button>
        )}

        <button type="button" className="btn-ver" onClick={() => seeDetailsHandle(orderInfo)}>
          Ver
        </button>
      </td>
    </tr>
  );
};