

export const ORDER_STATE_TXT = {
    P: "Pendiente",
    IP: "Confirmado",
    OTW: "En camino",
    D: "Entregado"
}

export interface OrderQuery {
    state?: string | null,
    orderId?: number | null,
    date?: string | null
}

export interface HoseData {
    hoseId: number,
    description: string,
    length: string,
    tubeId: number,
    casingId: number,
    screwIds: number[],
    extra: {supplyId: number, count: number}[]
}

export interface OrderInfo {
    orderId: number,
    state: string,
    orderDate: string,
    description: string,
    client: {
        clientId: number,
        name: string,
        surname: string,
        cuit: string,
        phone: string,
        email: string
    },
    hoses: HoseData[],
    amount: string
}