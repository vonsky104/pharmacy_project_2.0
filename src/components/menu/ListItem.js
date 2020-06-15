import React from 'react';
import { NavLink } from 'react-router-dom';

const ListItem = props => (
    <li>
        <NavLink exact to={props.path} className="link-menu">
            {props.title}
        </NavLink>
    </li>
);

export { ListItem };
