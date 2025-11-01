import { apiClient } from "../../service/api.ts"
import type { OrderInfo, OrderQuery } from "../order.interface.ts";




const formatQuery = (query: OrderQuery) : string => {
    let result : string = "";
    if(query.state) result = result.concat(`&state=${query.state}`);
    if(query.orderId) result = result.concat(`&orderId=${query.orderId}`);
    return result;
}

export const orderService = {
    async searchOrders(query: OrderQuery): Promise<OrderInfo[]> {
        try {
            const response = await apiClient.get(`orders/search-admin?${formatQuery(query)}`);
            return (response.data as any[]).map<OrderInfo>((order: any): OrderInfo => {
                let orderPrice: number = 0.0;
                for (const hose of order.hose) {
                    for (const item of hose.supplyHose) {
                        orderPrice += item.amount * parseFloat(item.supply.price);
                    }
                }
                return {
                    orderId: order.id,
                    state: order.state,
                    orderDate: order.orderDate,
                    client: order.client,
                    amount: String(orderPrice)
                };
            });
        } catch (error)
        {
            throw new Error('Error consulting orders: ' + (error as Error).message);
        }
    }
}