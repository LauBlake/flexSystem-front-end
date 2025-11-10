import type { OrderInfo } from "../order.interface.ts";


const ORDER_STATES = {
    "P": "Pendiente",
    "IP": "En proceso",
    "OTW": "En camino",
    "D": "Entregado"
} as const;


export const OrderCard = (orderCardInfo: { key: number, orderInfo: OrderInfo }) => {

    const orderInfo = orderCardInfo.orderInfo;
    const seeDetailsHandle = (order: OrderInfo) => {
        console.log('Ver detalle de pedido:', order);
        // Aquí podrías abrir otro modal con los detalles completos del pedido
        alert(`Ver detalles del ${order.orderId} de ${order.client}`);
    };

    const getStateColor = (estado: string) => {
        switch (estado) {
        case 'P':
            return '#ff6b6b';
        case 'IP':
            return '#4ecdc4';
        case 'OTW':
            return '#95e1d3';
        case 'Completado':
            return '#51cf66';
        default:
            return '#868e96';
        }
    };

    return (
        <tr key={orderCardInfo.key}>
            <td>{orderInfo.orderId}</td>
            <td>
                <span 
                    className="estado-badge"
                    style={{ backgroundColor: getStateColor(orderInfo.state) }}
                >
                    {orderInfo.state} // TODO: Hacer "human readable"
                </span>
            </td>
            <td>{orderInfo.orderDate}</td>
            <td className="importe-cell">
                ${orderInfo.amount}
            </td>
            <td className="acciones-cell">
                <button 
                    className="btn-ver"
                    onClick={() => seeDetailsHandle(orderInfo)}
                >
                    Ver
                </button>
            </td>
        </tr>
    )
    }