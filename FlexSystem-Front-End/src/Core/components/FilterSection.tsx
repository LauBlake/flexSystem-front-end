import './Filter.css'



export const FilterSection = (props: {children: any}) => {
    return (
        <div className='filtros-section'>
            {props.children}
        </div>
    );
}