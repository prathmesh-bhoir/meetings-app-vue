import { BASE_URL } from "./config";
import axios from "axios";


const getUsers = async function(){
    const response = await axios.get(`${BASE_URL}/users`)

    return response
}

export default getUsers