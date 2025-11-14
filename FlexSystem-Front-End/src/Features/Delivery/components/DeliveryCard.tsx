import type { DeliveryEntity } from "../delivery.interface.ts";
import { useState, type ReactNode } from "react";
import { BothDeliveryService } from "../service/deliveryService.ts";
import { useNavigate } from "react-router-dom";


const getStateColor = (estado: string) => {
  switch (estado) {
    case 'PENDING':    return '#ff6b6b';
    case 'DONE':       return '#4ecdc4';
    default:           return '#868e96';
  }
};

export interface DeliveryCardProps {

  delivery: DeliveryEntity,
  children?: ReactNode,
  rowKey: number

}

export const DeliveryCard = (props: DeliveryCardProps) => {

  const navigate = useNavigate();

  const [deliveryState, setDeliverySate] = useState<string>(props.delivery.state);

  const onApprovePressed = async () => {
    await BothDeliveryService.markAsDelivered(props.delivery.id)
    setDeliverySate("DONE");
  }

  return ( 
    <tr key={props.rowKey}>
      <td>{props.delivery.id}</td>
      <td>
        <span className="estado-badge" style={{ backgroundColor: getStateColor(deliveryState) }}>
          {deliveryState}
        </span>
      </td>
      <td>{props.delivery.dateAprox}</td>
      <td>
        {deliveryState === "PENDING" && (
          <button
            key={0}
            className="finish-delivery-button"
            onClick={onApprovePressed}
          >
            Finalizar Entrega
          </button>
        )}
        <button
          key={1}
          className="see-delivery-button"
          onClick={() => navigate(`/deliveries/${props.delivery.id}`)}
        >
          Ver
        </button>
      </td>
  
    </tr>
  )

}