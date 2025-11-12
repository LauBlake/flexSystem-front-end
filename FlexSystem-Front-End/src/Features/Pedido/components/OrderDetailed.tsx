import { useEffect, useState } from "react";
import { supplyService } from "../../Supplies/services/supplyService.ts";
import type { SupplyData } from "../../Supplies/supply.interface.ts";
import type { HoseData } from "../order.interface.ts";

type Props = {
  hoseData: HoseData;
  orderDate: string;
  orderStateLit: string;
  priceAmount: string;
};

type LoadedSupply = { amount: number; supply: SupplyData };

export const OrderDetailed = (properties: Props) => {
  const { hoseData } = properties;
  const [loadedSupplies, setLoadedSupplies] = useState<LoadedSupply[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initData = async () => {
      try {
        const supplies = await Promise.all(
          (hoseData.supplyHose ?? []).map(async (item) => ({
            amount: item.amount,
            // 👇 usamos el tipo del item para llamar al controlador correcto
            supply: await supplyService.getSupply(item.supply, item.type),
          }))
        );
        setLoadedSupplies(supplies);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, [hoseData]);

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
            ) : loadedSupplies.length ? (
              <ul>
                {loadedSupplies.map((item, i) => (
                  <li key={`${item.supply?.supplyId ?? i}-${i}`}>
                    {item.supply?.description ?? "Sin descripción"} (Cant: {item.amount})
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