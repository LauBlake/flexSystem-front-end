import { apiClient } from "../../service/api.ts";
import type { SupplyData } from "../supply.interface.ts";
import type { SupplyKind } from "../../Pedido/order.interface.ts";

export const supplyService = {
  async getSupply(id: number, supplyType: SupplyKind): Promise<SupplyData> {
    try {
      // si tu API es /orders/supplies/{tipo}/{id} mantenemos ese esquema:
      const url = `orders/supplies/${supplyType}/${id}`;
      const { data } = await apiClient.get(url);
      console.log("Supply data:", data);
      return data as SupplyData;
    } catch (error) {
      throw new Error("Error consulting orders: " + (error as Error).message);
    }
  },

  // (opcional) endpoint genérico si tenés supply.controller.ts para /supplies/:id
  async getSupplyById(id: number): Promise<SupplyData> {
    const { data } = await apiClient.get(`supplies/${id}`);
    return data as SupplyData;
  },
};