import { useEffect, useState } from "react";
import { supplyService } from "../../Supplies/services/supplyService.ts";
import type { SupplyData } from "../../Supplies/supply.interface.ts";
import type { HoseData } from "../order.interface.ts";



export const OrderDetailed = (properties: {hoseData: HoseData, orderDate: string, orderStateLit: string, priceAmount: string}) => {

    const [casing, setCasing] = useState<SupplyData>({});
    const [tube, setTube] = useState<SupplyData>({});
    const [screws, setScrews] = useState<{count: number, screw: SupplyData}[]>([]);
    const [extras, setExtras] = useState<{count: number, supply: SupplyData}[]>([]);

    useEffect(() => {
        const initData = async () => {
            try {
                setCasing(await supplyService.getSupply(properties.hoseData.casingId, "casing"));
                setTube(await supplyService.getSupply(properties.hoseData.tubeId, "tube"));
                setScrews([]);
                setExtras(properties.hoseData.extra.map((item) => {
                    return { count: item.count, supply: {} as SupplyData }
                }))
            } catch (error) {
                console.log(error)
            }
        }
        initData();
    }, []);

    return (
        <div className="pedido-expanded">
            <div className="expanded-content">
                <h4>Detalles Completos:</h4>
                <div className="detalles-grid">
                    <div className="detalle-group">
                        <h5>Componentes:</h5>
                        <ul>
                            <li>Camisa: {casing?.description || 'No seleccionado'}</li>
                            <li>Caño: {tube.description || 'No seleccionado'}</li>
                            {screws.map((screw, index) => (
                                <li key={index}>
                                    Tuerca {index + 1}: {screw.screw.description} (Cant: {screw.count || 1})
                                </li>
                            ))}
                        {extras.map((extra, index) => (
                            <li key={index}>
                                Agregado {index + 1}: {extra.supply.description} (Cant: {extra.count || 1})
                            </li>
                        ))}
                        </ul>
                    </div>
                    <div className="detalle-group">
                        <h5>Información del Pedido:</h5>
                        <p><strong>Fecha:</strong> {properties.orderDate}</p>
                        <p><strong>Estado:</strong> {properties.orderStateLit}</p>
                        <p><strong>Total:</strong> {`$${properties.priceAmount}`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}