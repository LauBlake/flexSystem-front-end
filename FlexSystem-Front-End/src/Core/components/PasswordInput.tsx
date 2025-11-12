import './TextInput.css'

interface PasswordInputProps {
    name: string,
    value: string,
    setValue: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string
}

export const PasswordInput = (props: PasswordInputProps) => {
    return (
        <div>
            <input
                type="password"
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.setValue}
                className="form-text-input"
            />
        </div>
    );
}