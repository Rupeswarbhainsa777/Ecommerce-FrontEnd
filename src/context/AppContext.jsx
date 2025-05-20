import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {fetchCategory} from "../service/CategoryService.js";

export const AppContext= createContext(null);

export const AppContextProvider= (props)=>{
 const [categories,setCategories] = useState([]);

    useEffect(() => {
        async  function loadData() {
           const response = await fetchCategory();
           setCategories(response.data);
        }
   loadData();


 },[]);


     const  contextValue = {
       categories,setCategories
     }
         return <AppContext.Provider value={contextValue}>
             {props.children}
         </AppContext.Provider>
}