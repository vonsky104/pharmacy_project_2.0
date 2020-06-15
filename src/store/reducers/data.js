import * as actionTypes from '../actions/actionTypes';
import { createSelector } from 'reselect';
import { updateObject } from '../utility';

const initialState = {
    events: [],
    users: [],
};

const eventsSelector = createSelector((state) => state.data.events, events => events);
const usersSelector = createSelector((state) => state.data.users, users => users);

const eventsForUser = (id) => createSelector(eventsSelector, events => events.filter(e => e.activePeople.find(u => u === id)));
const eventFromStoreSelector = (event) => createSelector(eventsSelector, events => events.find(e => e.name === event));
const userFromStoreSelector = (id) => createSelector(usersSelector, users => users.find(e => e.id === id));

function dataReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_DATA:
            return updateObject(state, {
                events: action.payload.dataEvents,
                users: action.payload.dataUsers,
            });
        default:
            return state
    }
};

export {
    dataReducer,
    eventsSelector,
    eventsForUser,
    eventFromStoreSelector,
    usersSelector,
    userFromStoreSelector,
};
