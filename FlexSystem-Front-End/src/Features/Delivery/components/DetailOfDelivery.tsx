import { PageCard } from "../../../Core/components/PageCard.tsx"

export interface DetailOfDeliveryProps {

  deliveryId: number

}

export const DetailOfDelivery = (props: DetailOfDeliveryProps) => {

  return (
    <PageCard description ={'detalle de la entrega #' + props.deliveryId}>
      <div>
        
      </div>
    </PageCard>
  )

}