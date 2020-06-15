import React from 'react';

const ObservedEvents = ({ data }) =>
    data.map(x => (
        <div key={x.event} className="box-observed-item">
            <Link to={'/events/' + x.event}>
                {x.name}
            </Link>
        </div>
    ));

export { ObservedEvents };
