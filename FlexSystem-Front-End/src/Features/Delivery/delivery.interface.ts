export const DeliveryState = {
  Pending: "PENDING",
  Done: "DONE",
} as const;

export type DeliveryState = typeof DeliveryState[keyof typeof DeliveryState];

export interface DeliveryEntity {
  id: number;
  state: DeliveryState;
  dateBeg?: string | null;
  dateAprox: string;
  dateEnd?: string | null;
  dealer?: any;
  orders: any[]; // o OrderEntity[]
}

export interface DeliveryCreatePayload {
  dateAprox: string; // ISO o lo que espere tu backend
}

export interface DeliveryUpdatePayload {
  orders?: number[];
  dealer?: number;
}

// lo que le mandás a /search-admin
export interface DeliverySearchQuery {
  page?: number;
  limit?: number;
  from?: string;
  to?: string;
  state?: DeliveryState;
  dealer?: number;
  sort?: string;
}