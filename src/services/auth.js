import axios from "axios";
import { BASE_URL } from "./utils/config";


export const login = async (credentials ) => {
    const response = await axios.post(`${BASE_URL}/auth/login`,
    credentials,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    );

    return response.data;
};

export const register = async (credentials) => {
    const response = await axios.post(`${BASE_URL}/auth/register`,
    credentials,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    );

    return response.data;
}; 