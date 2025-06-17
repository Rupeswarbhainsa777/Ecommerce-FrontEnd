import './Explore.css';
import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import DisplayCategory from "../../Components/DisplayCategory/DisplayCategory.jsx";
import DisplayItems from "../../Components/DisplayItems/DisplayItems.jsx";
import CustomerForm from "../../Components/CustomerForm/CustomerForm.jsx";
import CartItems from "../../Components/CartItems/CartItems.jsx";
import CartSummary from "../../Components/CartSummary/CartSummary.jsx";
import {fetchItems} from "../../service/ItemSevices.js";
import {createOrder} from "../../service/OrderServices.js";

const Explore = () => {


    const {categories} = useContext(AppContext);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    return (
        <div className="explore-container text-light">
            <div className="left-column">
                <div className="first-row" style={{ overflowY: 'auto' }}>
                    <DisplayCategory
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        categories={categories}

                    />
                </div>
                <hr className="horizontal-line" />
                <div className="second-row" style={{ overflowY: 'auto' }}>
                    <DisplayItems selectedCategory={selectedCategory} />
                </div>
            </div>

            <div className="right-column d-flex flex-column">
                <div className="customer-form-container" style={{ height: '20%' }}>
                    <CustomerForm
                    customerName={customerName}
                    mobileNumber={mobileNumber}
                    setMobileNumber={setMobileNumber}
                    setCustemerName={setCustomerName}

                    />
                </div>

                <div className="cart-items" style={{ height: '50%', overflowY: 'auto' }}>
                    <CartItems/>
                </div>

                <div className="cart-summary-container" style={{ height: '35%' }}>
                           <CartSummary

                               customerName={customerName}
                                            mobileNumber={mobileNumber}
                                            setMobileNumber={setMobileNumber}
                                            setCustemerName={setCustomerName}

                           />
                </div>
            </div>
        </div>
    );
}
export  default Explore;