import React from 'react';
import { Redirect } from 'react-router-dom';
import { logout } from '../../store/actions';
import { useDispatch } from 'react-redux';

const Logout = () => {
    const dispatch = useDispatch();
    dispatch(logout());

    return (
        <Redirect to={'/'} />
    );
};

export { Logout };
