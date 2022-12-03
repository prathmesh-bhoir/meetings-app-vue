import axios from "axios";
import { BASE_URL } from "./utils/config";


export const filterMeetings = async (period, search) => {
    const response = await axios.get(`${BASE_URL}/meetings?period=${period}&search=${search}`);

    return response.data
}

export const excuseMeet = async (id) => {
    const response = await axios.patch(`${BASE_URL}/meetings/${id}?action=remove_attendee`);

    return response.data
}

export const addUserToMeeting = async (meetId, userId) => {
    const response = await axios.patch(`${BASE_URL}/meetings/${meetId}?action=add_attendee&email=${userId}`)

    return response
}

export const addMeeting = async (meetDetails) => {

    const attendees = meetDetails.attendees.split(', ')

    const details = {
        name: meetDetails.name,
        description: meetDetails.description,
        date: meetDetails.date,
        startTime: meetDetails.startTime,
        endTime: meetDetails.endTime,
        attendees
    }

    const response = await axios.post(`${BASE_URL}/meetings`, details)

    return response
}