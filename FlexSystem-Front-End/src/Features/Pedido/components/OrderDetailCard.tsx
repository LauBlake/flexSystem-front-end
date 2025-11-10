import { useState } from "react";
import { HoseCard } from "../../Hose/components/HoseCard.tsx";
import { ORDER_STATE_TXT, type HoseData, type OrderInfo } from "../order.interface.ts";
import { OrderDetailed } from "./OrderDetailed.tsx";


export const OrderDetailCard = (orderCardInfo: {id: number, orderInfo: OrderInfo}) => {
    const order = orderCardInfo.orderInfo;

    const [expanded, setExpanded] = useState<boolean>(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const handleEliminarPedido = (orderId: number) => {
        if (window.confirm('¿Está seguro que desea eliminar este pedido?')) {
            console.log("Eliminando el pedido " + orderId);
        }
    };

    const handleVerDetalle = () => {
        toggleExpanded();
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
        <div key={orderCardInfo.id} className="pedido-item">
            <div className="pedido-summary">
                <div className="pedido-info">
                    {order.hoses.map((hose: HoseData) => (
                        <HoseCard hoseData={hose}></HoseCard>
                    ))}
                </div>
                  
                <div className="pedido-details">
                    <div className="descripcion-section">
                        <h4>Descripción:</h4>
                        <p>{order.description}</p>
                    </div>
                </div>
                  
                <div className="pedido-actions">
                    <div className="importe-info">
                        <span className="importe-label">Importe:</span>
                        <span className="importe-valor">{`$${0.0}`}</span>
                    </div>
                    <div className="estado-badge" style={{ backgroundColor: getStateColor(order.state) }}>
                        {ORDER_STATE_TXT[order.state as keyof typeof ORDER_STATE_TXT]}
                    </div>
                    <button 
                      className="ver-btn"
                      onClick={() => handleVerDetalle()}
                    >
                        ⚙️ Ver
                    </button>
                    <button 
                      className="eliminar-btn" 
                      onClick={() => handleEliminarPedido(order.orderId)}
                    >
                        🗑️
                    </button>
                </div>
            </div>
            {expanded && ( order.hoses.map((hose) => (
                <OrderDetailed 
                    hoseData={hose} 
                    orderDate={order.orderDate}
                    orderStateLit={ORDER_STATE_TXT[order.state as keyof typeof ORDER_STATE_TXT]}
                    priceAmount={order.amount}
                ></OrderDetailed>)) )}
        </div>
    );
}