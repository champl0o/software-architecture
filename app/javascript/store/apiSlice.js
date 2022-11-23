import { createSlice } from '@reduxjs/toolkit'

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
        role: 'consultant',

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

export const signIn = ({role}) => async (dispatch) => {
    dispatch(authenticate({role}))
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

export const getSlots = () => async (dispatch) => {
    const slots = await API.getSlots();
    return slots;
}

export const getCities = () => async (dispatch) => {
    const {cities} = await API.getCities();
    return cities.data;
}

export const getSpecialisations = () => async (dispatch) => {
    const {specialisations} = await API.getSpecialisations();
    return specialisations.data;
}

export const searchConsultants = (sortBy) => async (dispatch) => {
    const consultants = await API.searchUsers(sortBy);
    console.log("searchConsultants", consultants)
    return parseConsultants(consultants);
}

export const getConsultations = () => async (dispatch) => {
    const consultations = await API.getConsultations();
    console.log("consultations", consultations)
    return consultations;
}

export const getSchedules = () => async (dispatch) => {
    const schedules = await API.getSchedules();
    console.log("schedules", schedules)
    return schedules;
}

export default apiSlice.reducer;
