import {createContext, useEffect,useState} from "react";
import {fetchCategory} from "../service/CategoryService.js";
import {fetchItems } from "../service/ItemSevices.js";
import item from "../Components/Item/Item.jsx";


export {createContext} from "react";

export const AppContext =createContext(null);

export const AppContextProvider = (props) => {

    const [categories, setCategories] = useState([]);
    const [itemsData,setItemsData] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    const  addToCart = (item) => {
       const    existingItem   =    cartItems.find(cartItems=> cartItems.name===item.name);
                      if(existingItem) {
                          setCartItems(cartItems.map(cartItem => cartItem.name===item.name ? {...cartItems,quantity: cartItem.quantity+1} : cartItems));
                      }
                      else
                      {
                          setCartItems([...cartItems, {...item,quantity:1}]);
                      }
    }

      const removeFromCart = (itemId) => {
                 setCartItems(cartItems.filter(Item => item.itemId !== itemId));
      }
      const updateQuantity = (itemId,newQuantity) => {

        setCartItems(cartItems.map(item => item.itemId === itemId ?{...item,quantity: newQuantity} : item     ));

      }


    const [auth, setAuth] = useState({token:null,role:null});
    useEffect(()=>{

        async  function loadData(){
            if(localStorage.getItem("token") && localStorage.getItem("role")){


                setAuthData(
                    localStorage.getItem("token"),
                    localStorage.getItem("role")
                );
            }


            const response = await fetchCategory();
            const itemResponse = await fetchItems();
            setCategories(response.data);
            setItemsData(itemResponse.data);
            console.log("response", itemResponse);

        }
        loadData();
    }, []);

    const setAuthData =(token,role) =>{
        setAuth({token,role});
    }
    const clearCart =()=>{
        setCartItems([]);

    }

    const contextValue ={
        categories,
        setCategories,
        auth,
        setAuthData,
        itemsData,
        setItemsData,
        addToCart,
        cartItems,
        removeFromCart,
        updateQuantity,
        clearCart,


    }


    return <AppContext.Provider value={contextValue}>
        {props.children}


    </AppContext.Provider>;
}