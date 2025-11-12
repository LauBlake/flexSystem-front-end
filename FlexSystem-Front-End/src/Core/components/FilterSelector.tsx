


interface FilterSelectorProps {
    value: string,
    setValue: (value: string) => void,
    label: string
    children: any
}

export const FilterSelector = (props : FilterSelectorProps) => {
    return (
        <div className="filtro-grupo">
            <label>{props.label}</label>
            <select 
                value={props.value} 
                onChange={(e) => props.setValue(e.target.value)}
                className="filtro-select"
            >
                {props.children}
            </select>
        </div>
    );
}