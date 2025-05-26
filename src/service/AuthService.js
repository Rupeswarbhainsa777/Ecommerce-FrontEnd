import axios from "axios";

export const login = async(data) =>
{
         return        await  axios.post("http://localhost:3000/login", data);

}