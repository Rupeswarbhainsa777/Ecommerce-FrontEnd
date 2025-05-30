import axios from "axios";

export const addCategory= async(category,token) =>{
  return await axios.post('http://localhost:9091/api/v1.0/admin/categories',category,{headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}});
}
export const deleteCategory= async(categoryId,token) =>{
  return await axios.delete(`http://localhost:9091/api/v1.0/admin/categories/${categoryId}`,{headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}});

}

export const fetchCategory = async ()=>{
  return await axios.get('http://localhost:9091/api/v1.0/categories',{headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}});
}

