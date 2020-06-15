import React from 'react';

const Spinner = (props) => (
    <div className={`loaderWrapper ${props.load}`}>
        <div className="loader"></div>
    </div>
);

export { Spinner };