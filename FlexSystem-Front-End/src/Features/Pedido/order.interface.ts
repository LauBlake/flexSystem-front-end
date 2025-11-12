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

export type SupplyKind = "casing" | "tube" | "screw" | "elbow" | "connector" | "supply";
/** Coincide con tu DTO/Entidad actual */
export interface SupplyHoseItem {
  amount: number;
  supply: number;      // id del insumo
  type: SupplyKind;    // 👈 NUEVO: tipo concreto para pegarle al controlador correcto
}

export interface HoseData {
  hoseId?: number;            // opcional si el backend lo envía
  description: string;
  length: number;             // ahora numérico
  ammount: number;            // (sic) viene así del backend
  correction?: string | null;
  supplyHose: SupplyHoseItem[];
}

export interface ClientInfo {
  clientId?: number;
  name?: string;
  surname?: string;
  cuit?: string;
  phone?: string;
  email?: string;
}

export interface OrderInfo {
  orderId: number;
  state: keyof typeof ORDER_STATE_TXT; // 'Pending' | 'InProcess' | ...
  orderDate: string | Date;
  description?: string;
  client?: ClientInfo;
  hoses: HoseData[];
  amount?: number | string; // puede venir como total o lo calculamos
}