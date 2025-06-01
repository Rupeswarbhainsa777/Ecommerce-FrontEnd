import {createContext, useEffect,useState} from "react";
import {fetchCategory} from "../service/CategoryService.js";
import {fetchItems } from "../service/ItemSevices.js";

export {createContext} from "react";

export const AppContext =createContext(null);

export const AppContextProvider = (props) => {

    const [categories, setCategories] = useState([]);
    const [itemData,setItemsData] = useState([]);
    const [auth, setAuth] = useState({token:null,role:null});
    useEffect(()=>{

      async  function loadData(){
                 const response = await fetchCategory();
                 const itemresponse = await fetchItems();
                 setCategories(response.data);
                 setItemsData(itemresponse.data);

        }
        loadData();
    }, []);

const setAuthData =(token,role) =>{
    setAuth({token,role});
}

    const contextValue ={
         categories,
        setCategories,
         auth,
        setAuthData,
        itemData,
        setItemsData

    }


    return <AppContext.Provider value={contextValue}>
        {props.children}


    </AppContext.Provider>;
}