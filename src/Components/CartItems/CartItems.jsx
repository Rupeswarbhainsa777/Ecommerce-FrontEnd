import './CartItems.css';
import { useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";

const CartItems = () => {
    const { cartItems, removeFromCart, updateQuantity } = useContext(AppContext);

    return (
        <div className="p-3 h-100 overflow-y-auto">
            {cartItems.length === 0 ? (
                <p className="text-light">Your cart is empty.</p>
            ) : (
                <div className="cart-items-list">
                    {cartItems.map((item, index) => (
                        <div className="cart-items mb-3 p-3 bg-dark rounded shadow-sm" key={index}>
                            {/* Title and Total */}
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h6 className="mb-0 text-white fw-semibold">{item.name}</h6>
                                <p className="mb-0 text-white fw-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                            </div>

                            {/* Quantity Controls */}
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-2">
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        disabled={item.quantity === 1}
                                        onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                                    >
                                        <i className="bi bi-dash"></i>
                                    </button>

                                    <span className="text-white fw-bold px-2">{item.quantity}</span>

                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                                    >
                                        <i className="bi bi-plus"></i>
                                    </button>
                                </div>

                                {/* Delete button */}
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => removeFromCart(item.itemId)}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CartItems;

