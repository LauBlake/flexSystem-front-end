import { useState } from "react";
import type { OrderEntity, HoseEntity } from "../order.interface";
import { ORDER_STATE_TXT } from "../order.interface";
import { orderService } from "../services/orderService";
import "./OrderDetailCard.css";
import { useAuth } from "../../Users/context/AuthContext.tsx";

const normRole = (r?: unknown) => String(r ?? "").toLowerCase();

/** Normaliza cualquier valor (string/number) a number para operar precios/cantidades */
const toNumber = (value: unknown): number => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return 0;

    // Ej: "1.234,56" → "1234.56"
    const normalized = trimmed
      .replace(/\./g, "") // separador de miles
      .replace(",", "."); // coma decimal a punto

    const parsed = Number(normalized);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

/** Calcula el importe real de una manguera a partir de sus supplyHose */
const getHoseTotal = (hose: HoseEntity): number => {
  const supplyHose = Array.isArray(hose.supplyHose) ? hose.supplyHose : [];

  return supplyHose.reduce((acc, sh) => {
    const price = toNumber(sh?.supply?.price); // SupplyEntity.price es string
    const amount = toNumber(sh?.amount);       // cantidad del insumo en esa manguera
    return acc + price * amount;
  }, 0);
};

export const OrderDetailCard = (props: { id: number; OrderEntity: OrderEntity }) => {
  const [order, setOrder] = useState<OrderEntity>(props.OrderEntity);
  const { user } = useAuth();
  const isAdmin = normRole(user?.role) === "admin";

  const [expanded, setExpanded] = useState<boolean>(false);
  const [saving, setSaving] = useState(false);

  const toggleExpanded = () => setExpanded(v => !v);

  const handleStart = async () => {
    try {
      setSaving(true);
      const updated = await orderService.setInProcess(order.orderId);
      setOrder(prev => ({ ...prev, state: updated.state ?? "InProcess" }));
    } catch (e: any) {
      alert(e.message || "No se pudo cambiar a InProcess");
    } finally {
      setSaving(false);
    }
  };

  const getStateColor = (estado: string) => {
    switch (estado) {
      case "Pending":   return "#ff6b6b";
      case "InProcess": return "#4ecdc4";
      case "OnTheWay":  return "#95e1d3";
      case "Delivered": return "#51cf66";
      case "Payed":     return "#00b341";
      default:          return "#868e96";
    }
  };

  const formatMoney = (n: unknown) => {
    const num = toNumber(n);
    return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(num || 0);
  };

  const hoses: HoseEntity[] = Array.isArray(order.hoses) ? order.hoses : [];

  // 🔧 Total de la orden calculado desde hoses -> supplyHose -> supply.price * amount
  const totalOrder = hoses.reduce((acc, hose) => acc + getHoseTotal(hose), 0);

  // 🔧 Descripción a nivel orden: concateno las descripciones de las mangueras
  const orderDescription =
    hoses.map(h => h.description).filter(Boolean).join(" | ") || "-";

  return (
    <div className="pedido-item">
      <div className="pedido-summary">
        <div className="pedido-info">
          {hoses.map((hose: HoseEntity, idx: number) => {
            const hoseTotal = getHoseTotal(hose);
            return (
              <div key={idx} className="hose-summary">
                <div><strong>Camisa/Descripción:</strong> {hose.description || "-"}</div>
                <div><strong>Largo:</strong> {String(hose.length)} m</div>
                {/* 🔧 Importe Hose calculado */}
                <div><strong>Importe Hose:</strong> {formatMoney(hoseTotal)}</div>
              </div>
            );
          })}
        </div>

        <div className="pedido-details">
          <div className="descripcion-section">
            <h4>Descripción:</h4>
            {/* 🔧 ahora usa las descripciones de las hoses */}
            <p>{orderDescription}</p>
          </div>
        </div>

        <div className="pedido-actions">
          <div className="importe-info">
            <span className="importe-label">Importe:</span>
            {/* 🔧 Total de la orden calculado */}
            <span className="importe-valor">{formatMoney(totalOrder)}</span>
          </div>

          <div
            className="estado-badge"
            style={{ backgroundColor: getStateColor(order.state) }}
          >
            {ORDER_STATE_TXT[order.state] ?? order.state}
          </div>

          {/* 👇 Solo admin + Pending */}
          {isAdmin && order.state === "Pending" && (
            <button
              type="button"
              disabled={saving}
              className="btn-iniciar"
              onClick={handleStart}
              title="Pasar a InProcess"
            >
              {saving ? "..." : "Iniciar"}
            </button>
          )}

          <button type="button" className="ver-btn" onClick={toggleExpanded}>
            ⚙️ Ver
          </button>
        </div>
      </div>

      {expanded && (
        <div className="pedido-expand">
          {hoses.map((hose: HoseEntity, idx: number) => {
            const supplyHose = Array.isArray(hose.supplyHose) ? hose.supplyHose : [];
            const hoseTotal = getHoseTotal(hose);

            return (
              <div key={idx} className="hose-detail">
                <h4>Manguera #{hose.hoseId ?? idx + 1}</h4>
                <ul className="hose-meta">
                  <li><strong>Descripción:</strong> {hose.description || "-"}</li>
                  <li><strong>Largo:</strong> {String(hose.length)} m</li>
                  {hose.correction ? <li><strong>Corrección:</strong> {hose.correction}</li> : null}
                  {/* 🔧 Importe calculado */}
                  <li><strong>Importe:</strong> {formatMoney(hoseTotal)}</li>
                </ul>

                <div className="supplies">
                  <strong>Componentes (SupplyHose):</strong>
                  {supplyHose.length > 0 ? (
                    <table className="supplies-table">
                      <thead>
                        <tr>
                          <th>Supply</th>
                          <th>Cantidad</th>
                        </tr>
                      </thead>
                      <tbody>
                        {supplyHose.map((sh, i) => (
                          <tr key={i}>
                            {/* SupplyEntity: id + descripción para que no salga [object Object] */}
                            <td>{`${sh.supply.supplyId} - ${sh.supply.description}`}</td>
                            <td>{String(sh.amount)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>Sin componentes asociados.</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
