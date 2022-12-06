import axios from "axios";
import { BASE_URL } from "./utils/config";

export const getMeetings = async (date) => {
    const response = await axios.get(`${BASE_URL}/calendar?date=${date}`)

    return response.data
}
