import { useState } from "react";
import type { OrderInfo, HoseEntity } from "../order.interface";
import { ORDER_STATE_TXT } from "../order.interface";
import { orderService } from "../services/orderService";
import "./OrderDetailCard.css"; // 👈 nuevo CSS
import { useAuth } from "../../Users/context/AuthContext.tsx";

const normRole = (r?: unknown) => String(r ?? '').toLowerCase();

export const OrderDetailCard = (props: { id: number; orderInfo: OrderInfo }) => {
  const [order, setOrder] = useState<OrderInfo>(props.orderInfo);
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
    const num = typeof n === "number" ? n : typeof n === "string" ? parseFloat(n) : 0;
    return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(num || 0);
  };

  const totalOrder = (() => {
    if (typeof order.amount === "number") return order.amount;
    if (typeof order.amount === "string") {
      const parsed = parseFloat(order.amount);
      if (!Number.isNaN(parsed)) return parsed;
    }
    return (order.hoses ?? []).reduce((acc, h) => acc + (Number(h.ammount) || 0), 0);
  })();

  const hoses: HoseEntity[] = Array.isArray(order.hoses) ? order.hoses : [];

  return (
    <div className="pedido-item">
      <div className="pedido-summary">
        <div className="pedido-info">
          {hoses.map((hose: HoseEntity, idx: number) => (
            <div key={idx} className="hose-summary">
              <div><strong>Camisa/Descripción:</strong> {hose.description || "-"}</div>
              <div><strong>Largo:</strong> {String(hose.length)} m</div>
              <div><strong>Importe Hose:</strong> {formatMoney(hose.ammount)}</div>
            </div>
          ))}
        </div>

        <div className="pedido-details">
          <div className="descripcion-section">
            <h4>Descripción:</h4>
            <p>{order.description || "-"}</p>
          </div>
        </div>

        <div className="pedido-actions">
          <div className="importe-info">
            <span className="importe-label">Importe:</span>
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
            return (
              <div key={idx} className="hose-detail">
                <h4>Manguera #{hose.hoseId ?? idx + 1}</h4>
                <ul className="hose-meta">
                  <li><strong>Descripción:</strong> {hose.description || "-"}</li>
                  <li><strong>Largo:</strong> {String(hose.length)} m</li>
                  {hose.correction ? <li><strong>Corrección:</strong> {hose.correction}</li> : null}
                  <li><strong>Importe:</strong> {formatMoney(hose.ammount)}</li>
                </ul>

                <div className="supplies">
                  <strong>Componentes (SupplyHose):</strong>
                  {supplyHose.length > 0 ? (
                    <table className="supplies-table">
                      <thead>
                        <tr><th>Supply ID</th><th>Cantidad</th></tr>
                      </thead>
                      <tbody>
                        {supplyHose.map((sh, i) => (
                          <tr key={i}>
                            <td>{String((sh as any).supply)}</td>
                            <td>{String((sh as any).amount)}</td>
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