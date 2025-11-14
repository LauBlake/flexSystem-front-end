import type { SupplyEntity } from "../Supplies/supply.interface.ts";
import type { ClientEntity } from "../Users/interface/usersInterface.ts";

export const ORDER_STATE_TXT: Record<string, string> = {
  Pending: "Pendiente",
  InProcess: "En proceso",
  OnTheWay: "En camino",
  Delivered: "Entregado",
  Payed: "Pagado",
};

export interface OrderQuery {
  state?: string | null;
  orderId?: number | null;
  date?: string | null;
}

export type SupplyType = "casing" | "tube" | "screw" | "elbow" | "connector" | "supply";
/** Coincide con tu DTO/Entidad actual */
export interface SupplyHoseItem {
  amount: number;
  supply: SupplyEntity | number;      // id del insumo
  type: SupplyType;    // 👈 NUEVO: tipo concreto para pegarle al controlador correcto
}

export interface HoseEntity {
  hoseId?: number;            // opcional si el backend lo envía
  description: string;
  length: number;             // ahora numérico
  ammount: number;            // (sic) viene así del backend
  correction?: string | null;
  supplyHose: SupplyHoseItem[];
}

export interface OrderEntity {
  orderId: number;
  state: keyof typeof ORDER_STATE_TXT;
  orderDate: string;
  client?: ClientEntity;
  hoses: HoseEntity[];
}

export interface HoseEntityCreate {
  length: number,
  description: string,
  tubeId: number,
  casingId: number,
  screwId: number | [number, number],
  extra: SupplyHoseItem[],
}

export interface OrderEntityCreate {
  client: number;
  hoses: HoseEntityCreate[]
}
