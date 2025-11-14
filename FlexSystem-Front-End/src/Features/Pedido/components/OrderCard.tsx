import { useEffect, useState } from 'react';
import { ORDER_STATE_TXT, type OrderEntity } from '../order.interface.ts';
import { orderService } from '../services/orderService.ts';
import type { SupplyEntity } from '../../Supplies/supply.interface.ts';



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


export interface OrderCardProps {
  order: OrderEntity,
  rowKey: number,
  onSee: (orderId: number) => void
}


export const OrderCard = (props: OrderCardProps) => {
  const [price, setPrice] = useState<string>("0");
  const [expanded, setExpanded] = useState<boolean>(false);
  const [orderState, setOrderSate] = useState<string>(props.order.state);

  const onSeePressed = () => {
    setExpanded(!expanded);
    props.onSee(props.order.orderId);
  }

  const onApprovePressed = async () => {
    await orderService.setInProcess(props.order.orderId);
    setOrderSate(ORDER_STATE_TXT.InProcess);
  }

  useEffect(() => {
    const sumPrice = async () => {
      let total : number = 0;
      for (const ho of props.order.hoses) {
        for (const item of ho.supplyHose) {
          const prod = parseFloat((item.supply as SupplyEntity).price) * item.amount;
          total += prod;
        }
      }
      setPrice(total.toString());
    }
    sumPrice();
  }, []);

  return (
    <tr key={props.rowKey}>
      <td>{props.order.orderId}</td>

      <td>
        <span className="estado-badge" style={{ backgroundColor: getStateColor(orderState) }}>
          {orderState}
        </span>
      </td>

      <td>{props.order.orderDate}</td>

      <td className="importe-cell">${price}</td>

      <td className="acciones-cell" style={{ display: 'flex', gap: 8 }}>
        <button
            key={0}
            onClick={onApprovePressed} 
            className="btn-ver"
        >
            Aprobar
        </button>
        <button
            key={1}
            onClick={onSeePressed} 
            className="btn-ver"
        >
            Ver
        </button>
      </td>
    </tr>
  );
};