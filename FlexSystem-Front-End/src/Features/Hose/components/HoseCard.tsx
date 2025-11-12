import type { HoseData } from "../../Pedido/order.interface.ts";

export const HoseCard = ({ hoseData }: { hoseData: HoseData }) => {
  return (
    <div className="pedido-componentes">
      <div className="componente-line">
        <span className="componente-label">Descripción:</span>
        <span className="componente-valor">
          {hoseData.description || "--------"}
        </span>
      </div>

      <div className="componente-line">
        <span className="componente-label">Largo:</span>
        <span className="componente-valor">
          {hoseData.length ? `${hoseData.length} m` : "--------"}
        </span>
      </div>

      <div className="componente-line">
        <span className="componente-label">Cantidad:</span>
        <span className="componente-valor">
          {hoseData.ammount ?? "--------"}
        </span>
      </div>

      {hoseData.correction && (
        <div className="componente-line">
          <span className="componente-label">Corrección:</span>
          <span className="componente-valor">{hoseData.correction}</span>
        </div>
      )}

      {hoseData.supplyHose?.length > 0 && (
        <div className="componente-line">
          <span className="componente-label">Suministros:</span>
          <span className="componente-valor">
            {hoseData.supplyHose
              .map((supply) => `ID ${supply.supply} x${supply.amount}`)
              .join(", ")}
          </span>
        </div>
      )}
    </div>
  );
};