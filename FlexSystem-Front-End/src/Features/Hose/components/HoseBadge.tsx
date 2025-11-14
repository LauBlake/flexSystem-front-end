import type { HoseEntity } from "../../Pedido/order.interface.ts";
import { SupplyOrderItem } from "../../Supplies/components/SupplyOrderItem.tsx";

export const HoseBadge = ({ hoseData }: { hoseData: HoseEntity }) => {
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
      {
        hoseData.supplyHose.map((item, index) => {
          const count = item.amount;
          const supply = item.supply;
          return <SupplyOrderItem count={count} supply={supply} index={index}/>;
        })
      }
    </div>
  );
};