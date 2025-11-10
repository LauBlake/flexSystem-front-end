import { apiClient } from "../../service/api.ts";
import type { SupplyData } from "../supply.interface.ts";





export const supplyService = {
    async getSupply(id: number, supplyType: string): Promise<SupplyData> {
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