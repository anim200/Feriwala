import axios from "axios";
const BASE_URL="http://localhost:5000/api/"
const Token="82390439053492534293";
console.log(JSON.parse(localStorage.getItem("persist:root")))

export const publicRequest = axios.create({
    baseURL:BASE_URL,
    
})
export const userRequest = axios.create({
    baseURL:BASE_URL,
    header:{token:`Bearer ${Token}`}
})