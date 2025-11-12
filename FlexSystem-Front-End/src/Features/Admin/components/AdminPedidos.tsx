import { useState, useEffect } from 'react';
import './AdminPedidos.css';
import { ORDER_STATE_TXT, type OrderInfo } from '../../Pedido/order.interface.ts';
import { orderService } from '../../Pedido/services/orderService.ts';
import { OrderCard } from '../../Pedido/components/OrderCard.tsx';
import { FilterSection } from '../../../Core/components/FilterSection.tsx';
import { FilterSelector } from '../../../Core/components/FilterSelector.tsx';
import { FilterTextInput } from '../../../Core/components/FilterTextInput.tsx';
import { PageCard } from '../../../Core/components/PageCard.tsx';

const AdminPedidos = () => {
  const [orders, setOrders] = useState<OrderInfo[]>([]);

  const [filtroEstado, setFiltroEstado] = useState<string>('');
  const [filtroPedido, setFiltroPedido] = useState<string>('');
  const [filtroFecha, setFiltroFecha] = useState<string>('');

  useEffect(() => {
    const fecthOrders = async () => {
      try {
        const orders = await orderService.searchOrders({
          state: filtroEstado.length ? filtroEstado : null,
          orderId: filtroPedido ? parseInt(filtroPedido) : null,
          date: filtroFecha.length ? filtroFecha : null
        });
        setOrders(orders);
      } catch (error) {
        console.log("No order found");
        setOrders([]);
      }
    }
    fecthOrders();
  }, [filtroEstado, filtroPedido, filtroFecha]);

  return (
    <div className="admin-pedidos-container">
      <PageCard description='Gestión de Pedidos de Administrador'>

        {/* Filtros */}
        <FilterSection>
          <FilterSelector value={filtroEstado} setValue={setFiltroEstado} label={'Estado'}>
            <option value="">Todos</option>
            <option value="P">{ORDER_STATE_TXT["P" as keyof typeof ORDER_STATE_TXT]}</option>
            <option value="IP">{ORDER_STATE_TXT["IP" as keyof typeof ORDER_STATE_TXT]}</option>
            <option value="OTW">{ORDER_STATE_TXT["OTW" as keyof typeof ORDER_STATE_TXT]}</option>
            <option value="D">{ORDER_STATE_TXT["D" as keyof typeof ORDER_STATE_TXT]}</option>
          </FilterSelector>

          <FilterTextInput 
            value={filtroPedido} 
            setValue={setFiltroPedido} 
            placeholder='Buscar pedido...'
            label="ID Pedido:"
          />

          <FilterTextInput 
            value={filtroFecha} 
            setValue={setFiltroFecha} 
            placeholder='DD/MM/YYYY'
            label='Rango de fechas:'
          />
        </FilterSection>

        {/* Tabla de Pedidos */}
        <div className="pedidos-tabla-container">
          <table className="pedidos-tabla">
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Importe</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="no-pedidos">
                    No se encontraron pedidos
                  </td>
                </tr>
              ) : (
                orders.map((order, index) => (
                  <OrderCard key={index} rowKey={index} orderInfo={order} />
                  ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="admin-footer">
          <p className="footer-text">
            Total de pedidos: <strong>{orders.length}</strong>
          </p>
        </div>
      </PageCard>
    </div>
  );
};

export default AdminPedidos;
