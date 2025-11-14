import { useState } from "react";
import type { SupplyEntity } from "../../Supplies/supply.interface.ts";
import type { SupplyType } from "../order.interface.ts";
import { SupplyOrderItem } from "../../Supplies/components/SupplyOrderItem.tsx";


export interface SupplySetBadgeProps {
    supplyId: number,
    supplyType?: SupplyType,
    children: string,
    onSearch: () => void,
    setCount: (count: number) => void,
    multi?: boolean
}

export const SupplySetBadge = (props: SupplySetBadgeProps) => {
    const [supply, setSupply] = useState<SupplyEntity>({} as SupplyEntity);
    const [count, setCount] = useState<number>(1);


    return (
        <div className="detalle-item">
            <label className="detalle-label">{props.children}:</label>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                <SupplyOrderItem index={0} supply={supply} count={count} />
                {props.multi ? <>
                    <button className="buscar-btn" onClick={() => {setCount(count+1)}}>
                        +
                    </button>
                    <button className="buscar-btn" onClick={() => {setCount(count-1 >= 0 ? count-1 : count)}}>
                        -
                    </button>
                </> : <></>}
                
                <button className="buscar-btn" onClick={() => {}}>
                    Buscar
                </button>
            </div>
        </div>
    );
}