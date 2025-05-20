import './Explore.css';
import {useContext} from "react";

const Explore = () => {
    const {categories} = useContext(AppContext);
    console.log()
    return (
        <div className="explore-container text-light">
            <div className="left-column">
                <div className="first-row" style={{ overflowY: 'auto' }}>
                    categories
                </div>
                <hr className="horizontal-line" />
                <div className="second-row" style={{ overflowY: 'auto' }}>
                    items
                </div>
            </div>

            <div className="right-column d-flex flex-column">
                <div className="customer-form-container" style={{ height: '20%' }}>
                    customer form
                </div>

                <div className="cart-items" style={{ height: '50%', overflowY: 'auto' }}>
                    cart items
                </div>

                <div className="cart-summary-container" style={{ height: '30%' }}>
                    cart summary
                </div>
            </div>
        </div>
    );
};

export default Explore;


