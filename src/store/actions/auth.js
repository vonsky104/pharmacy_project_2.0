import { axiosInstance as axios } from '../../config/axios-control';
import { firebaseApp, key } from '../../config/firebase';
import * as actionTypes from './actionTypes';

export const logout = () => {
    return { type: actionTypes.AUTH_LOGOUT };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authStart = () => {
    return { type: actionTypes.AUTH_START };
};

const authSuccess = (token, userId, isAdmin) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId,
        isAdmin
    };
};

const authFail = error => {
    return { type: actionTypes.AUTH_FAIL, error };
};

const signIn = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = { email: email, password: password, returnSecureToken: true };

        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + key, authData)
            .then(response => {
                const userId = response.data.localId;
                axios.get('/users.json').then(responseUsers => {
                    let isAdmin = false;
                    for (let key in responseUsers.data) {
                        const user = responseUsers.data[key];
                        if (user?.id === userId) {
                            isAdmin = user.is_boss;
                        }
                    }

                    dispatch(authSuccess(response.data.idToken, userId, isAdmin));
                    dispatch(checkAuthTimeout(response.data.expiresIn));
                    firebaseApp.auth().signInWithEmailAndPassword(email, password);
                });
            })
            .catch(err => {
                console.error(err);
                dispatch(authFail(err.response.data.error));
            })
    };
};

export { signIn }
