import axios from "axios";

export const fetchDashBoard= async ()=>{

  return  await axios.get("http://localhost:9091/api/v1.0/dashboard",{headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}});

}

