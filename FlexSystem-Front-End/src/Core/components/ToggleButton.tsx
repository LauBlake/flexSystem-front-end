import { useState } from "react"


export interface ToggleButtonProps {
    startEnabled?: boolean,
    onEnable: () => void,
    onDisable: () => void,
}


export const ToggleButton = (props: ToggleButtonProps) => {
    const [enabled, setEnabled] = useState<boolean>(props.startEnabled ?? false);

    return (
        <div className="">
            <input type="checkbox" checked={enabled}/>
        </div>
    );
}