import { createSlice } from '@reduxjs/toolkit'
import { propTypes } from 'react-bootstrap/esm/Image.js';

import API from '../api/api.mjs'

import getAPIConfig from  '../api/apiConfig.mjs'
const APIConfig = getAPIConfig();

export const apiSlice = createSlice({
    name: 'api',
    initialState: {
        error: false,
        warning: false,

        // Authentication
        isLoggedIn: false,
        email: '',
        role: '',
        userId: ''

    },
    reducers: {
        setError: (state, {payload}) => {
            let error = payload ? payload.error : false;
            if(error) {
                if(!APIConfig.errorStatuses.includes(error.status)) {
                    error = false;
                } else if(error.message) {
                    error = error.message;
                }
            }
            state.error = error;
        },
        authenticate: (state, {payload}) => {
            state.isLoggedIn = true;
            console.log("ROLE", payload)
            state.role = payload.role;
            state.userId = payload.userId;
        },
    },
})


export const { setError, setLocale } = apiSlice.actions;
export const checkAPIError = (response, dispatch, handlers) => {
    dispatch(setError(response));
    if(!response.error) {
        if(handlers && handlers.onSuccess) handlers.onSuccess();
    } else {
        if(handlers && handlers.onError) handlers.onError();
    }
}

const { authenticate } = apiSlice.actions;

export const checkAuthentication = () => async (dispatch) => {
    // checkAPIError(response, dispatch, {
    //     onSuccess: () => {
           
    //     },
    // });
}

export const signIn = ({role, userId}) => async (dispatch) => {
    dispatch(authenticate({role, userId}))
    // checkAPIError(response, dispatch, {
    //     onSuccess: () => {
    //         dispatch(checkAuthentication());
    //     }
    // });
}

const parseConsultants = (consultants) => {
    const consultantsList = consultants.filter(item => item.attributes.role === 'consultant').map(item => {
        return {
            ...item.attributes,
        }
    })
    return consultantsList;
}

export const getConsultantsList = () => async (dispatch) => {
    const consultants = await API.getConsultants();
    return parseConsultants(consultants);
}

export const getSlots = (id) => async (dispatch) => {
    const slots = await API.getSchedules(id);
    console.log("getSlots",slots )
    return slots.map((slot) => {
        return {
            day: slot.attributes.day,
            slots: slot.attributes.slots
        }
    });
}

export const getCities = () => async (dispatch) => {
    const {cities} = await API.getCities();
    return cities.data;
}

export const getSpecialisations = () => async (dispatch) => {
    const {specialisations} = await API.getSpecialisations();
    return specialisations.data;
}

export const searchConsultants = (sortBy, filter, query) => async (dispatch) => {
    const consultants = await API.searchUsers(sortBy, filter, query);
    console.log("searchConsultants", consultants)
    return parseConsultants(consultants);
}

const addMinutes = (date, minutes) => {
    return new Date(date.getTime() + minutes*60000);
}

export const getConsultations = (id, role) => async (dispatch) => {
    const consultations = await API.getConsultations();

    return consultations.filter((consultation)=> {
        return consultation.attributes[role].id == id
    }).map(consultation => {
        return {
            consultation_id: consultation.attributes.id,
            title: consultation.attributes.consultation_definition.title,
            user: consultation.attributes.user,
            consultant: consultation.attributes.consultant,
            issue: consultation.attributes.issue,
            start: consultation.attributes.appointment_time,
            end: addMinutes(new Date(consultation.attributes.appointment_time), consultation.attributes.consultation_definition.duration)
        }
    });
}

const translateDay = (day) => {
    const days = {
        Monday: 'Понеділок',
        Tuesday: 'Вівторок',
        Wednesday: 'Середа',
        Thursday: 'Четвер',
        Friday: "П'ятниця",
        Saturday: 'Субота',
        Sunday: 'Неділя',
    }
    return days[day];
}

export const getSchedules = (id) => async (dispatch) => {
    const schedules = await API.getSchedules(id);
    console.log("schedules", schedules)
    return schedules.map((schedule) => {
        return {
        id: schedule.attributes.id,
        start: `${(schedule.attributes.start_time.match(/\d\d:\d\d/))[0]}`,
        end: `${(schedule.attributes.end_time.match(/\d\d:\d\d/))[0]}`,
        day: translateDay(schedule.attributes.day),
    }});
}

export const getConsultationTypes = (id) => async (dispatch) => {
    console.log("id", id)
    const response = await API.getConsultationTypes();
    return response.filter(type => {
        return type.attributes.consultant.id == id;
    }).map(type => {
        console.log(type)
        return type.attributes
    });
}

export const createConsultation = ({appointment_time, issue, consultation_definition_id, user_id, consultant_id}) => async (dispatch) => {
    console.log("createConsultation", {appointment_time, issue, consultation_definition_id, user_id, consultant_id})
    const responce =  await API.createConsultations({
        appointment_time,
        issue,
        consultation_definition_id,
        user_id,
        consultant_id,
    });
    return responce;
}


export const createSchedule = ({consultant_id, day, start_time, end_time}) => async (dispatch) => {
    console.log("createSchedule", {consultant_id, day, start_time, end_time})
    const responce =  await API.createSchedule({
        consultant_id, day, start_time, end_time
    });
    return responce;
}

export const createConsultationType = ({consultant_id, title, description, duration})  => async (dispatch) => {
    console.log("createConsultationType", {consultant_id, title, description, duration})
    const responce =  await API.createConsultationType({
        consultant_id, title, description, duration
    });
    return responce;
}

export const deleteConsultationType = ({id}) => async (dispatch) => {
    console.log("deleteConsultationType", {id})
    const responce =  await API.deleteConsultationType({id});
    return responce;
}

export const deleteConsultation =  ({id}) => async (dispatch) => {
    console.log("deleteConsultation", {id})
    const responce =  await API.deleteConsultation({id});
    return responce;
}

export const deleteWorkingHours = ({id})=> async (dispatch) => {
    console.log("deleteConsultationType", {id})
    const responce =  await API.deleteSchedule({id});
    return responce;
}

export default apiSlice.reducer;
