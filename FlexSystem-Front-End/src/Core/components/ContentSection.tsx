
import './Section.css'

interface ContentSectionProps {
    children: any
}

export const ContentSection = (props : ContentSectionProps) => {
    return (
        <div className="content-section">
            {props.children}
        </div>
    );
}