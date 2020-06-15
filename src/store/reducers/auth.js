import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { createSelector } from 'reselect';

const initialState = {
    userId: null,
    user: null,
    error: null,
    loading: false
};

const authStart = state => {
    return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        userId: action.userId,
        user: action.user,
        isAdmin: action.isAdmin,
        error: null,
        loading: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authLogout = state => {
    return updateObject(state, { user: null, userId: null });
};

const userIdSelector = createSelector(state => state.auth.userId, userId => userId);
const isAuthSelector = createSelector(state => state.auth.userId, userId => userId !== null);
const isAdminSelector = createSelector(state => state.auth.isAdmin, isAdmin => isAdmin);

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default:
            return state;
    }
};

export {
    authReducer,
    isAdminSelector,
    isAuthSelector,
    userIdSelector,
};