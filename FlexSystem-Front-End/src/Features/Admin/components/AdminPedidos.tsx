import { useState } from 'react';
import './AdminPedidos.css';
import PagoModal from './PagoModal';

interface Pedido {
  id: number;
  cliente: string;
  pedidoId: string;
  estado: 'Pendiente' | 'Confirmado' | 'Pagado' | 'Completado';
  fecha: string;
  importe: number;
}

const AdminPedidos = () => {
  const [pedidos] = useState<Pedido[]>([
    {
      id: 1,
      cliente: 'Santiago',
      pedidoId: 'Pedido: 6',
      estado: 'Pendiente',
      fecha: '06/01/2024',
      importe: 15000
    },
    {
      id: 2,
      cliente: 'Samuel',
      pedidoId: 'Pedido: 8',
      estado: 'Confirmado',
      fecha: '09/08/2024',
      importe: 22500
    },
    {
      id: 3,
      cliente: 'María González',
      pedidoId: 'Pedido: 12',
      estado: 'Pagado',
      fecha: '15/09/2024',
      importe: 18750
    }
  ]);

  const [filtroEstado, setFiltroEstado] = useState<string>('');
  const [filtroPedido, setFiltroPedido] = useState<string>('');
  const [filtroFecha, setFiltroFecha] = useState<string>('');
  const [pagoModalOpen, setPagoModalOpen] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState<Pedido | null>(null);

  const pedidosFiltrados = pedidos.filter(pedido => {
    const matchEstado = !filtroEstado || pedido.estado === filtroEstado;
    const matchPedido = !filtroPedido || pedido.pedidoId.toLowerCase().includes(filtroPedido.toLowerCase());
    const matchFecha = !filtroFecha || pedido.fecha.includes(filtroFecha);
    return matchEstado && matchPedido && matchFecha;
  });

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Pendiente':
        return '#ff6b6b';
      case 'Confirmado':
        return '#4ecdc4';
      case 'Pagado':
        return '#95e1d3';
      case 'Completado':
        return '#51cf66';
      default:
        return '#868e96';
    }
  };

  const handleAbonar = (pedido: Pedido) => {
    setPedidoSeleccionado(pedido);
    setPagoModalOpen(true);
  };

  const handleVerDetalle = (pedido: Pedido) => {
    console.log('Ver detalle de pedido:', pedido);
    // Aquí podrías abrir otro modal con los detalles completos del pedido
    alert(`Ver detalles del ${pedido.pedidoId} de ${pedido.cliente}`);
  };

  return (
    <div className="admin-pedidos-container">
      <div className="admin-pedidos-card">
        {/* Header */}
        <div className="admin-header">
          <h1 className="admin-title">Flexisur</h1>
          <p className="admin-subtitle">Gestión de Pedidos</p>
          <div className="admin-divider"></div>
        </div>

        {/* Filtros */}
        <div className="filtros-section">
          <div className="filtro-grupo">
            <label>Estado:</label>
            <select 
              value={filtroEstado} 
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="filtro-select"
            >
              <option value="">Todos</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Confirmado">Confirmado</option>
              <option value="Pagado">Pagado</option>
              <option value="Completado">Completado</option>
            </select>
          </div>

          <div className="filtro-grupo">
            <label>Id Pedido:</label>
            <input
              type="text"
              value={filtroPedido}
              onChange={(e) => setFiltroPedido(e.target.value)}
              placeholder="Buscar pedido..."
              className="filtro-input"
            />
          </div>

          <div className="filtro-grupo">
            <label>Rango de fechas:</label>
            <input
              type="text"
              value={filtroFecha}
              onChange={(e) => setFiltroFecha(e.target.value)}
              placeholder="DD/MM/YYYY"
              className="filtro-input"
            />
          </div>
        </div>

        {/* Tabla de Pedidos */}
        <div className="pedidos-tabla-container">
          <table className="pedidos-tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Pedido</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Importe</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={7} className="no-pedidos">
                    No se encontraron pedidos
                  </td>
                </tr>
              ) : (
                pedidosFiltrados.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>{pedido.id}</td>
                    <td className="cliente-cell">{pedido.cliente}</td>
                    <td>{pedido.pedidoId}</td>
                    <td>
                      <span 
                        className="estado-badge"
                        style={{ backgroundColor: getEstadoColor(pedido.estado) }}
                      >
                        {pedido.estado}
                      </span>
                    </td>
                    <td>{pedido.fecha}</td>
                    <td className="importe-cell">
                      ${pedido.importe.toLocaleString('es-AR')}
                    </td>
                    <td className="acciones-cell">
                      <button 
                        className="btn-ver"
                        onClick={() => handleVerDetalle(pedido)}
                      >
                        Ver
                      </button>
                      <button 
                        className="btn-abonar"
                        onClick={() => handleAbonar(pedido)}
                        disabled={pedido.estado === 'Pagado' || pedido.estado === 'Completado'}
                      >
                        Abonar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="admin-footer">
          <p className="footer-text">
            Total de pedidos: <strong>{pedidosFiltrados.length}</strong>
          </p>
        </div>
      </div>

      {/* Modal de Pago */}
      {pagoModalOpen && pedidoSeleccionado && (
        <PagoModal
          pedido={pedidoSeleccionado}
          onClose={() => {
            setPagoModalOpen(false);
            setPedidoSeleccionado(null);
          }}
          onConfirmarPago={() => {
            console.log('Pago confirmado para:', pedidoSeleccionado);
            setPagoModalOpen(false);
            setPedidoSeleccionado(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminPedidos;
