import { apiClient } from "../../service/api.ts"
import { authService } from "../../Users/service/authService.ts";
import type { OrderInfo, OrderQuery } from "../order.interface.ts";




const formatQuery = (query: OrderQuery) : string => {
    let result : string = "";
    if(query.state) result = result.concat(`&state=${query.state}`);
    if(query.orderId) result = result.concat(`&orderId=${query.orderId}`);
    if(query.date) {
        const dateSplit = query.date.split('/');
        const day = dateSplit[0] ?? null;
        const month = dateSplit[1] ?? (new String((new Date()).getMonth() + 1)).padStart(2, '0');
        const year = dateSplit[2] ?? (new Date()).getFullYear();
        const formattedYear = year.length == 4 ? year : ('2' + year.padStart(3, '0'));
        const formattedDate = formattedYear + '-' + month.padStart(2, '0') + '-' + day.padStart(2, '0');
        result = result.concat(`&from=${formattedDate + "T00:00:00"}&to=${formattedDate + "T23:59:59"}`);
    }
    return result;
}

export const orderService = {
    async searchOrders(query: OrderQuery): Promise<OrderInfo[]> {
        const usrInfo = authService.getUserInfo();
        const userEndpoint = usrInfo ? ("search-" + usrInfo?.role): "search-admin";
        try {
            const response = await apiClient.get(`orders/${userEndpoint}?${formatQuery(query)}`);
            return (response.data as any[]).map<OrderInfo>((order: any): OrderInfo => {
                let orderPrice: number = 0.0;
                for (const hose of order.hose) {
                    for (const item of hose.supplyHose) {
                        orderPrice += item.amount * parseFloat(item.supply.price);
                    }
                }
                const [date, time] = order.orderDate.split('T');
                const [year, month, day] = date.split('-');
                const [hours, minutes, _] = time.split(':');
                const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
                return {
                    orderId: order.id,
                    state: order.state,
                    description: order.description,
                    orderDate: formattedDate,
                    client: order.client,
                    hoses: order.hose,
                    amount: String(orderPrice)
                };
            });
        } catch (error)
        {
            throw new Error('Error consulting orders: ' + (error as Error).message);
        }
    },

    async setInProcess(orderId: number) {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:3000/orders/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ state: 'InProcess' })
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`No se pudo actualizar. HTTP ${res.status} ${text}`);
    }
    return res.json(); // devuelve el pedido actualizado (si tu API lo retorna)
  },
  
}