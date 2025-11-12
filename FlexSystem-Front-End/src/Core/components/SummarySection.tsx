import './Section.css'

interface ContentSectionProps {
    children: any
}

export const SummarySection = (props : ContentSectionProps) => {
    return (
        <div className="summary-section">
            {props.children}
        </div>
    );
}