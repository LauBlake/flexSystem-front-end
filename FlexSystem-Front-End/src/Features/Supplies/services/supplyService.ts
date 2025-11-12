import { apiClient } from "../../service/api.ts";
import type { SupplyData } from "../supply.interface.ts";
import type { SupplyKind } from "../../Pedido/order.interface.ts";

export const supplyService = {
    async getSupply(id: number, supplyType: SupplyKind): Promise<SupplyData> {
        try {
            const response = await apiClient.get(`orders/supplies/${supplyType}/${id}`);
            console.log("Supply data: " + response.data);
            return response.data as SupplyData;
        } catch (error)
        {
            throw new Error('Error consulting orders: ' + (error as Error).message);
        }
    }
}