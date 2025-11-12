
import './PageCard.css';



interface PageCardProps {
    description: string
    children?: any
}

export const PageCard = (props : PageCardProps) => {
    return (
      <div className="page-card">
        <div className="page-card-header">
          <h1>Flexisur</h1>
          <p>{props.description}</p>
        </div>
        <div className="page-card-main">
            {props.children}
        </div>
      </div>
    );
}