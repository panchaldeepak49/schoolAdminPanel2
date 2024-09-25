import axios from "axios";


const url = "http://localhost:4000";

const BASE_URL = url ;

export const userRequest = axios.create({
    baseUrl : BASE_URL ,
    headers : {
        "Content-Type" : "application/json",
        //  Authorization : 
    }
})