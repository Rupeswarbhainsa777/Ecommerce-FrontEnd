import './CartSummary.css'
import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import item from "../Item/Item.jsx";
import ReceipetPopup from "../ReceipetPopup/ReceipetPopup.jsx";
import {deleteItem} from "../../service/ItemSevices.js";
import toast from "react-hot-toast";
import {createOrder} from "../../service/OrderServices.js";

const  CartSummary = ({customerName,mobileNumber,setMobileNumber,setCustemerName}) => {


    const {cartItems,clearCart} = useContext(AppContext);
    const [isProssing, setIsProssing] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const totalAmount = cartItems.reduce((total,item) => total+item.price*item.quantity,0);
    const tax = totalAmount*0.01;
    const grandTotal = totalAmount+tax;
    const clearAll =()=>{
        setCustemerName(" ");
        setMobileNumber("");
        clearCart();
    }
    const placedOrder = () => {
      setShowPopup(true);
      clearAll();
    }
    const handlePrintReceipt = () => {
        window.print();
    }



    const deleteMyOrder = async (orderId) => {
        try {
            await deleteItem(orderId);
        }
        catch (error) {
            console.log(error);
            toast.error("Something wnt wrong");
        }

    }

    const completePayment = async (paymentMode) => {
        if(!customerName || !mobileNumber){
            toast.error("Please enter your credentials ");
            return;
        }
        if(cartItems.length === 0 ){
            toast.error("You haven't added to the cart");
            return;

        }
        const  orderData = {
            customerName,
            phoneNumber : mobileNumber,
            cartItems,
            subtotal : totalAmount,
            tax ,
            grandTotal,
            paymentMethod : paymentMode.toUpperCase()
        }
        setIsProssing(true);
        try {
              const response = await createOrder(orderData);
              const savedData = response.data;
              if(response.status === 201 && paymentMode ==="cash"){
                  toast.success("Case Received successfully");
                  setOrderDetails(savedData);

              }
              else if(response.status === 201 && paymentMode ==="upi"){
                  toast("This Feature is Not Present This time");
                 // await deleteMyOrder(savedData.orderId);
                 // return;
              }

        }
        catch (error) {
            console.log(error);
            toast.error("Payment Failed");

        }
        finally {
            setIsProssing(false);
        }
    }
    const verifyPaymentHandler = async (response,saveOrder) => {
         const  paymentData = {

         }

    }




    return (
        <div className="mt-2">
                        <div className="cart-summary-details">

                              <div className="d-flex justify-content-between mb-2">
                                  <span className="text-light ">
                                      Item:
                                  </span>
                                  <span className="text-light ">
                                      ₹{totalAmount.toFixed(2)}
                                  </span>

                              </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-light ">Tax(1%)</span>
                                <span className="text-light"> ₹{tax.toFixed(2)}</span>

                            </div>

                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-light ">Total:</span>
                                <span className="text-light">₹{grandTotal.toFixed(2)}</span>

                            </div>

                        </div>

             <div className="d-flex gap-3">
                 <button className="btn btn-success flex-grow-1"
               onClick={() => completePayment("cash")}
                         disabled={isProssing}

                 >
                     {isProssing ? 'Processing' : 'Cash'}

                 </button>
                 <button className="btn btn-primary flex-grow-1"
                         onClick={() => completePayment("upi")}
                         disabled={isProssing}
                 >
                     {isProssing ? 'Processing' : 'UPI'}

                 </button>


             </div>

           <div className="d-flex gap-3 mt-3">
               <button className="btn btn-warning flex-grow-1"

               onClick={placedOrder}
                       disabled={isProssing ||  !orderDetails}

               >
                   Place Order
               </button>

           </div>

            {
                showPopup && (
                    <ReceipetPopup
                    orderDetails={{
                        ...orderDetails
                    }}
                    onClose={() => setShowPopup(false)}
                    onPrint={handlePrintReceipt}

                    />
                )
            }
        </div>
    )
}

export default CartSummary;