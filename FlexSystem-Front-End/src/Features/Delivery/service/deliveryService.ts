// deliveryService.ts
import { apiClient } from "../../service/api.ts";
import type { AdminDeliveryClient, DealerDeliveryClient } from "../delivery.client.ts";
import type {
  DeliveryEntity,
  DeliveryCreatePayload,
  DeliveryUpdatePayload,
  DeliverySearchQuery,
} from "../delivery.interface";



const toQueryString = (params: Record<string, any>): string => {
  const entries = Object.entries(params)
    .filter(([_, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
  return entries.length ? `?${entries.join("&")}` : "";
};

export const AdminDeliveryService: AdminDeliveryClient = {
  async search(query?: DeliverySearchQuery): Promise<DeliveryEntity[]> {
    const qs = query ? toQueryString(query) : "";
    const data = await apiClient.get(`deliveries/search-admin${qs}`);
    return (data.data ?? data) as DeliveryEntity[];
  },

  async create(payload: DeliveryCreatePayload): Promise<DeliveryEntity> {
    const data = await apiClient.post("deliveries", payload);
    return data as DeliveryEntity;
  },

  async update(
    deliveryId: number,
    payload: DeliveryUpdatePayload
  ): Promise<DeliveryEntity> {
    const data = await apiClient.patch(`deliveries/${deliveryId}`, payload);
    return data as DeliveryEntity;
  },

  async markAsDelivered(deliveryId: number): Promise<DeliveryEntity> {
    const data = await apiClient.patch(`deliveries/finish/${deliveryId}`, {});
    return data as DeliveryEntity;
  },
};

export const DealerDeliveryService: DealerDeliveryClient = {
  async search(): Promise<DeliveryEntity[]> {
    const data = await apiClient.get("deliveries/search-dealer");
    return data as DeliveryEntity[];
  },

  async markAsDelivered(deliveryId: number): Promise<DeliveryEntity> {
    const data = await apiClient.patch(`deliveries/finish/${deliveryId}`, {});
    return data as DeliveryEntity;
  },
};


