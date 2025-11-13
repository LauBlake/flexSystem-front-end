import type { SupplyEntity } from "../supply.interface.ts";
import './SupplyOrderItem.css'

export interface SupplyOrderItemProps {
    index: number,
    supply: SupplyEntity,
    count: number,
}

export const SupplyOrderItem = (props : SupplyOrderItemProps) => {
    return (
        <div className='supply-order-item'>
            <label className='supply-label sup-id'>#{props.supply.supplyId ?? 0}</label>
            <label className='supply-label sup-descr'>{props.supply.description ?? "Desconocido"}</label>
            <label className='supply-label sup-count'>x{props.count ?? 0}</label>
        </div>
    );
}