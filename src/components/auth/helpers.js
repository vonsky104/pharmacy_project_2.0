import React from 'react';

const errorMessage = (error) => {
    const isError = error.isError;
    if (!isError) {
        return null;
    }

    let message;

    switch (error.message) {
        case 'EMAIL_NOT_FOUND':
            message = 'Nie znaleziono adresu email';
            break;
        case 'INVALID_PASSWORD':
            message = 'Złe hasło';
            break;
        default:
            message = 'Wystąpił błąd';
    }

    return (
        <div className="errorBar">
            <p>{message}</p>
        </div>
    );
};

export { errorMessage };
