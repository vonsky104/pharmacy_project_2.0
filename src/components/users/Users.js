import React from 'react';
import { Link } from 'react-router-dom';
import { usersSelector } from '../../store/reducers/data';
import { useSelector } from 'react-redux';
import { isAdminSelector } from '../../store/reducers/auth';
import { mapSportToIcon } from '../events/helpers';

const Users = () => {
    const isAdmin = useSelector(isAdminSelector);
    const users = useSelector(usersSelector);
    const removeUser = (id) => true;

    return (
        <section className="section-users">
            <h3 className="section-users__h3">Lista użytkowników</h3>
            {/*<div className="panel-user">*/}
                {/*<span className="panel-user-name">Nazwa</span>*/}
                {/*{isAdmin && (*/}
                    {/*<span className="panel-user-options">Opcje</span>*/}
                {/*)}*/}
            {/*</div>*/}
            <div className="panel-user-wrapper">
                {users.map(x => {
                    return (
                        <div key={x.id} className="panel-user">
                            <span className="panel-user-icon">
                               <img src={mapSportToIcon(x.favourite_sport)} />
                             </span>
                            <Link className="panel-user-name" to={'/users/' + x.id}>
                                {x.name}
                            </Link>
                            {/*{user === 'admin' ? (*/}
                                {/*<div*/}
                                    {/*className="panel-close"*/}
                                    {/*onClick={() => removeUser(x.id)}*/}
                                {/*>*/}
                                    {/*<i className="fas fa-times" />*/}
                                {/*</div>*/}
                            {/*) : null}*/}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export { Users };
