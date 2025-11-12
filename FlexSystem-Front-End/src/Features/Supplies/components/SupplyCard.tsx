
interface SupplyProps {
    index: number,
    supplyId: number,
    type: string,
    price: string,
    children: any
}

export const SupplyCard = (props : SupplyProps) => {
    return (
        <tr key={props.index}>
            <td>{props.supplyId}</td>
            <td>{props.type}</td>
            <td>{"$"+props.price}</td>
            <td className="acciones-cell">
                {props.children}
            </td>
        </tr>
    );
}