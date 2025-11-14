import type { SupplyType } from "../../Pedido/order.interface.ts";
import { apiClient } from "../../service/api.ts";
import type { SupplyData } from "../supply.interface.ts";

interface SupplyQuery {
    supplyType?: string; 
}

const parseSearch = (query: SupplyQuery) => {
    let result : string = "";
    if(query.supplyType) result = result.concat("supplyType=" + query.supplyType);
    return result;
}

export const supplyService = {
    async getSupply(id: number, supplyType: SupplyType): Promise<SupplyData> {
        try {
            const response = await apiClient.get(`orders/supplies/${supplyType}/${id}`);
            console.log("Supply data: " + response.data);
            return response.data as SupplyData;
        } catch (error)
        {
            throw new Error('Error consulting orders: ' + (error as Error).message);
        }
    },

    async searchSupplies(search: SupplyQuery) {
        try {
            const response = await apiClient.get(`orders/supplies/search-client?${parseSearch(search)}`);
            console.log("Supply data: " + response.data);
            return response.data as SupplyData[];
        } catch (error)
        {
            throw new Error('Error consulting orders: ' + (error as Error).message);
        }
    }
}