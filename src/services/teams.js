import axios from "axios";
import { BASE_URL } from "./utils/config";


export const filterTeams = async () => {
    const response = await axios.get(`${BASE_URL}/teams`);

    return response.data
}

export const excuseTeam = async (teamId) => {
    const response = await axios.patch(`${BASE_URL}/teams/${teamId}?action=remove_member`)

    return response.data
}

export const addUserToTeam = async (teamId, userId) => {
    const response = await axios.patch(`${BASE_URL}/teams/${teamId}?action=add_member&email=${userId}`)

    return response.data
}