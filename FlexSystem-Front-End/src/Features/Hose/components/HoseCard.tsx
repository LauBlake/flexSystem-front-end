import type { HoseData as HoseData } from "../../Pedido/order.interface.ts";


export const HoseCard = (properties: {hoseData : HoseData}) => {
    return (
        <div className="pedido-componentes">
            <div className="componente-line">
                <span className="componente-label">Camisa:</span>
                <span className="componente-valor">{properties.hoseData.casingId || '--------'}</span>
            </div>
            <div className="componente-line">
                <span className="componente-label">Caño:</span>
                <span className="componente-valor">{properties.hoseData.tubeId || '--------'}</span>
            </div>
            <div className="componente-line">
                <span className="componente-label">Tuercas:</span>
                <span className="componente-valor">
                    {properties.hoseData?.screwIds?.map(s => `${s}`).join(', ') || '--------'}
                </span>
            </div>
            {properties.hoseData?.extra?.length > 0 && (
                <div className="componente-line agregados-link">
                    <span className="componente-label">+ {properties.hoseData.extra.length} agregados</span>
                </div>
            )}
        </div>
    );
}