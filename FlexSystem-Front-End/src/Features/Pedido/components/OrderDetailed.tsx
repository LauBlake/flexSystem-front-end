import { useState } from "react";
import type { HoseEntity } from "../order.interface.ts";

type OrderDetailedProps = {
  hoseData: HoseEntity;
  orderDate: string;
  orderStateLit: string;
  priceAmount: string;
};


export const OrderDetailed = (properties: OrderDetailedProps) => {
  const { hoseData } = properties;
  const [loading, setLoading] = useState(true);

  return (
    <div className="pedido-expanded">
      <div className="expanded-content">
        <h4>Detalles Completos:</h4>

        <div className="detalles-grid">
          <div className="detalle-group">
            <h5>Manguera:</h5>
            <ul>
              <li>Descripción: {hoseData.description || "--------"}</li>
              <li>Largo: {hoseData.length ? `${hoseData.length} m` : "--------"}</li>
              <li>Cantidad: {hoseData.ammount ?? "--------"}</li>
              {hoseData.correction && <li>Corrección: {hoseData.correction}</li>}
              {hoseData.hoseId != null && <li>ID: {hoseData.hoseId}</li>}
            </ul>
          </div>

          <div className="detalle-group">
            <h5>Insumos:</h5>
            {loading ? (
              <p>Cargando insumos…</p>
            ) : properties.hoseData.supplyHose.length ? (
              <ul>
                {properties.hoseData.supplyHose.map((item, i) => (
                  <li key={`${item.supply.supplyId ?? i}-${i}`}>
                    {item.supply.description ?? "Sin descripción"} (Cant: {item.amount})
                  </li>
                ))}
              </ul>
            ) : (
              <p>Sin insumos asociados.</p>
            )}
          </div>

          <div className="detalle-group">
            <h5>Información del Pedido:</h5>
            <p><strong>Fecha:</strong> {properties.orderDate}</p>
            <p><strong>Estado:</strong> {properties.orderStateLit}</p>
            <p><strong>Total:</strong> {`$${properties.priceAmount}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};