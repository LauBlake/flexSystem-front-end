import { ContentSection } from "../../../Core/components/ContentSection.tsx";
import { PageCard } from "../../../Core/components/PageCard.tsx";
import type { OrderEntity } from "../../Pedido/order.interface.ts";
import { SupplyOrderItem } from "../../Supplies/components/SupplyOrderItem.tsx";
import './OrderInformation.css'

export interface OrderInformationProps {
    order: OrderEntity
}

export const OrderInformation = (props: OrderInformationProps) => {
    return (
        <div className='order-info-container'>
            <PageCard description="Información del pedido">
                <ContentSection>
                    {props.order.hoses.map((hose, index) => {
                        return (
                            <div className="hose-data">
                                <p className="hose-title">Manguera {index}</p>
                                <label className="hose-information">Largo: {hose.length}cm</label>
                                <label className="hose-information">Cantidad: {hose.ammount}</label>
                                <p className="hose-information">Composición:</p>
                                <div className="hose-information hose-items">
                                    {hose.supplyHose.map((item, index) => {
                                        return (
                                            <SupplyOrderItem 
                                                supply={item.supply} 
                                                index={index} 
                                                count={item.amount}
                                            />
                                        );
                                    })}

                                </div>
                            </div>
                        );
                    })}
                    
                </ContentSection>
            </PageCard>
        </div>
    );
};