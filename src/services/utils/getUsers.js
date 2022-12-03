import { BASE_URL } from "./config";
import axios from "axios";


const getUsers = async function(){
    const data = await axios.get(`${BASE_URL}/users`)

    return data
}

export default getUsers