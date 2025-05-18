import axios from "axios";

export const addCategory= async(category) =>{
  return await axios.post('http://localhost:9091/api/v1.0/categories',category);
}
export const deleteCategory= async(categoryId) =>{
  return await axios.delete(`http://localhost:9091/api/v1.0/categories/${categoryId}`);
}
export const fetchCategory = async ()=>{
  return await axios.get('http://localhost:9091/api/v1.0/categories');
}

