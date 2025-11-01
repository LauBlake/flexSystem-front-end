

export const ORDER_STATE_TXT = {
    P: "Pendiente",
    IP: "Confirmado",
    OTW: "En camino",
    D: "Entregado"
}

export interface OrderQuery {
    state?: string | null,
    orderId?: number | null,
    date: string | null
}

export interface OrderInfo {
    orderId: number,
    state: string,
    orderDate: string,
    client: number,
    amount: string
}