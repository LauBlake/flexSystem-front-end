

export interface FilterTextInputProps {
    value: string,
    setValue: (value: string) => void,
    placeholder: string,
    label: string
    children?: string
}

export const FilterTextInput = (props : FilterTextInputProps) => {
    return (
        <div className="filtro-grupo">
            <label>{props.label}</label>
            <input
              type="text"
              value={props.value}
              onChange={(e) => props.setValue(e.target.value)}
              placeholder={props.placeholder}
              className="filtro-input"
            />
        </div>
    );
}