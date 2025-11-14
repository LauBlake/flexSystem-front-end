import { ContentSection } from "../../../Core/components/ContentSection.tsx";
import { PageCard } from "../../../Core/components/PageCard.tsx";
import type { OrderEntity } from "../../Pedido/order.interface.ts";
import type { ClientEntity } from "../../Users/interface/usersInterface.ts";
import { ClientBadge } from "../../Users/components/ClientBadge.tsx";
import './OrderInformation.css'
import { HoseBadge } from "../../Hose/components/HoseBadge.tsx";

export interface OrderInformationProps {
    order: OrderEntity
}

export const OrderInformation = (props: OrderInformationProps) => {
    return (
        <div className='order-info-container'>
            <PageCard description="Información del pedido">
                <ContentSection>
                    <ClientBadge client={props.order.client ?? {} as ClientEntity}/>
                    {props.order.hoses.map((hose, index) => {
                        return <HoseBadge hoseData={hose}/>;
                    })}
                </ContentSection>
            </PageCard>
        </div>
    );
};