import react from 'react';
import Card from '../Card/Card';

const ShowProductsByName = (props) => {
    if (props.items.lenght === 0) {
        return (
            <div>
                <h2>No items found.</h2>
            </div>
        )
    }

    return (
        <div>
            <h2>Pronadjeno je { props.items.lenght} proizvoda.</h2>
        </div>
    )
};

export default ShowProductsByName;