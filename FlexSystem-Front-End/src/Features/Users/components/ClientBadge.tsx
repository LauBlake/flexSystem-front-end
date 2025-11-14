import { ContentSection } from "../../../Core/components/ContentSection.tsx";
import type { ClientEntity } from "../interface/usersInterface.ts";
import './ClientBadge.css';


export interface ClientBadgeProps {
    client: ClientEntity
}

export const ClientBadge = (props: ClientBadgeProps) => {
    return (
        <div className="client-badge">
            <ContentSection>
                <h2>Cliente:</h2>
                <div className="badge-subsections">
                    <div>
                        <strong>{props.client.surname}, {props.client.name}</strong>
                        <label><strong>CUIT:</strong> {props.client.cuit}</label>
                    </div>
                    <label><strong>Tel:</strong> {props.client.phone}</label>
                </div> 
            </ContentSection>
        </div>
    );
}