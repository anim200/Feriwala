import axios from "axios";
const BASE_URL="http://localhost:5000/api/"
const Token="8349303859430524";
console.log(Token);


export const publicRequest = axios.create({
    baseURL:BASE_URL,
    
})
export const userRequest = axios.create({
    baseURL:BASE_URL,
    header:{token:`Bearer ${Token}`}
})