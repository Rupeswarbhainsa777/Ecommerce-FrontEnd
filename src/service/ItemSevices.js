import axios    from "axios";
export const addItem = async (item) => {
   return  await axios.post(`http://localhost:9091/api/v1.0/admin/items`, item,{headers:{'Authorization':`Bearer${localStorage.getItem('token')}`}});
}

export const deleteItem = async (item) => {
    return  await axios.delete(`http://localhost:9091/api/v1.0/admin/items/${itemId}`,{headers:{'Authorization':`Bearer${localStorage.getItem('token')}`}});
}

export const fetch =async (item) => {
    return await axios.get(`http://localhost:9091/api/v1.0/admin/items`, {headers:{'Authorization':`Bearer${localStorage.getItem('token')}`}});
}