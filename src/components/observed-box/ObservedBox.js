import React, { useState } from 'react';
import { ObservedEvents } from './ObservedEvents';

const ObservedBox = ({ data }) => {
    const mockData = ['Wydarzenie'];
    const [showBox, setShowBox] = useState(false);
    const baseClassName = 'box-observed';
    const className = showBox ? `${baseClassName} show` : baseClassName;
    const text = showBox ? '>>' : '<<';

    return (
        <div className={className}>
            <h2>Obserwowane wydarzenia</h2>
            <ObservedEvents data={mockData} />
            <div
                className="box-observed__show-btn"
                onClick={() => setShowBox(!showBox)}
            >
                {text}
            </div>
        </div>
    );
};

export { ObservedBox };
