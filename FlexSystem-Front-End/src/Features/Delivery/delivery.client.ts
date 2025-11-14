import type { DeliveryCreatePayload, DeliveryEntity, DeliverySearchQuery, DeliveryUpdatePayload } from "./delivery.interface.ts";


export interface BaseDeliveryClient {

  markAsDelivered(deliveryId: number): Promise<DeliveryEntity>;
}

export interface AdminDeliveryClient extends BaseDeliveryClient {

  search(query?: DeliverySearchQuery): Promise<DeliveryEntity[]>;


  create(payload: DeliveryCreatePayload): Promise<DeliveryEntity>;

  update(
    deliveryId: number,
    payload: DeliveryUpdatePayload
  ): Promise<DeliveryEntity>;
}


export interface DealerDeliveryClient extends BaseDeliveryClient {

  search(): Promise<DeliveryEntity[]>;
  
}