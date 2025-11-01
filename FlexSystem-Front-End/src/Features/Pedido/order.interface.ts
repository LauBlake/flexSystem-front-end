
export interface OrderQuery {
    state?: string | null,
    orderId?: number | null
}

export interface OrderInfo {
    orderId: number,
    state: string,
    orderDate: string,
    client: number,
    amount: string
}