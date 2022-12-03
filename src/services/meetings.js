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

    // attendees.forEach(element => {
    //     element = element.trim()
    //     if (!/^[A-Za-z0-9@_.-]*$/.test(element)) {
    //         alert("enter correct team or email id")
    //         return
    //     }
    //     if (!/^[A-Za-z][A-Za-z0-9_.-]*@[a-z]*[.][a-z]*$/.test(element)) {
    //         alert("enter correct team or email id")
    //         return
    //     }
    // })

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