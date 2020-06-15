import { axiosInstance as axios } from '../../config/axios-control';
import * as actionTypes from './actionTypes';

export const fetchData = () => {
    return (dispatch) => {
        const dataEvents = [];
        const dataUsers = [];

        Promise.all([
            axios.get('/events.json'),
            axios.get('/users.json')
        ]).then(responses => {
            const eventsResponse = responses[0];
            const usersResponse = responses[1];
            for (let key in eventsResponse.data) {
                eventsResponse.data[key] && dataEvents.push({
                        key,
                        ...eventsResponse.data[key]
                    });
            }

            for (let key in usersResponse.data) {
                usersResponse.data[key] && dataUsers.push({
                    ...usersResponse.data[key]
                });
            }

            dispatch({ type: actionTypes.FETCH_DATA, payload: {dataEvents, dataUsers }});
        }).catch(e => console.error(e));
    }
};