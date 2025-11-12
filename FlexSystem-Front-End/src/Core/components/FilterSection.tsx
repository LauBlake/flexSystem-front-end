import './Section.css'

interface FilterSectionProps {
    children: any
}

export const FilterSection = (props: FilterSectionProps) => {
    return (
        <div className='filter-section'>
            {props.children}
        </div>
    );
}