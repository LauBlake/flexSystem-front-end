import { useState } from "react";
import type { HoseEntity, HoseEntityCreate, SupplyType } from "../order.interface.ts";
import { SupplySetBadge } from "./SupplySetBadge.tsx";
import { useNavigate } from "react-router-dom";

export interface HoseMakeProps {
    hose: HoseEntityCreate,
    onUpdate: (hose: HoseEntity) => void
}


export const HoseMake = (props : HoseMakeProps) => {
    const [multiEnabled, setMulti] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSearch= (type: string) => {
        navigate("./supply-search");
    };

    return (
        <div>
            <SupplySetBadge 
                supplyType={'tube' as SupplyType}
                supplyId={props.hose.tubeId} 
                onSearch={() => handleSearch("tube")}
                setCount={(_) => {}}  
            >
                Caño
            </SupplySetBadge>
            
            <SupplySetBadge 
                supplyType={'casing' as SupplyType}
                supplyId={props.hose.casingId} 
                onSearch={() => handleSearch("casing")}
                setCount={(_) => {}}  
            >
                Camisa
            </SupplySetBadge>
            
            <div className="detalle-item">
                <label className="detalle-label">Tuercas:</label>
                <button className="add-item-btn" onClick={() => setMulti(!multiEnabled)}>
                    Alternar distinto
                </button>
                {!multiEnabled ? 
                    <SupplySetBadge
                        supplyType={'casing' as SupplyType}
                        supplyId={props.hose.screwId as number} 
                        onSearch={() => handleSearch("casing")}
                        setCount={(_) => {}}  
                    >
                        Tuerca 1
                    </SupplySetBadge>
                :
                <>
                    <SupplySetBadge 
                        supplyType={'casing' as SupplyType}
                        supplyId={(props.hose.screwId as [number, number])[0]} 
                        onSearch={() => handleSearch("casing")}
                        setCount={(_) => {}}  
                    >
                        Tuerca 1
                    </SupplySetBadge>
                    <SupplySetBadge 
                        supplyType={'casing' as SupplyType}
                        supplyId={(props.hose.screwId as [number, number])[1]} 
                        onSearch={() => handleSearch("casing")}
                        setCount={(_) => {}}  
                    >
                        Tuerca 2
                    </SupplySetBadge>
                </>
                }
            </div>
            <div className="detalle-item">
                <label className="detalle-label">Agregados:</label>
                {props.hose.extra.map((item, index) => {return <></>})}
                <button className="add-item-btn" onClick={() => {}}>
                    + Agregado
                </button>
            </div>
        </div>
    );
}