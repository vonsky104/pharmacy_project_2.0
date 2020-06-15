import React from 'react';
import { Menu } from '../menu/Menu';
import { Spinner } from '../utils/Spinner';

const Layout = (props) => {
    return (
        <div>
            <Spinner load={false} />
            <Menu />
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col">{props.children}</div>
                    </div>
                </div>
            </main>
        </div>
    )
};

export { Layout };