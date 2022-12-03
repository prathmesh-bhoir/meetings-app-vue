import axios from "axios";
import { BASE_URL } from "./utils/config";


export const filterTeams = async () => {
    const response = await axios.get(`${BASE_URL}/teams`);

    return response.data
}