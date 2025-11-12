import './TextInput.css'

interface TextInputProps {
    name: string,
    value: string,
    setValue: (value: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,
};

export const TextInput = (props: TextInputProps) => {
    return (
        <div>
            <input
                type="text"
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.setValue}
                className="form-text-input"
            />
        </div>
    );
}