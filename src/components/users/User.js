import React from 'react';
import { useSelector } from 'react-redux';
import {
    eventsForUser,
    eventsSelector,
    userFromStoreSelector,
    usersSelector
} from '../../store/reducers/data';
import { Link } from 'react-router-dom';
import { mapSportToIcon } from '../events/helpers';

const User = (props) => {
    const user = useSelector(userFromStoreSelector(props.match.params.user));

    const userId = user?.id;
    const events = useSelector(eventsForUser(userId));
    if (!user) return <div></div>;
    const isAuth = false;


    return (
        <section className="section-pharmacies">
            <div key={user.id} className="row">
                <div className="col">
                    <div className="community-profile">
                        <div className="row">
                            <div className="col-3">
                                <div className="community-profile-info">
                                    <div className="community-profile__photo">
                                        <img src={mapSportToIcon(user.favourite_sport)} />
                                    </div>
                                    <h3 className="community-profile__h3">{user.name}</h3>
                                    <h3 className="community-profile__h4">Ulubiony sport: {user.favourite_sport}</h3>
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="community-profile-content">
                                    <h3 className="community-profile__h3">Wydarzenia w których bierze udział użytkownik</h3>
                                    {events && events.map((x) => {
                                            return (
                                                <div
                                                    key={x.key}
                                                    className="community-profile-comment"
                                                >
                                                    <Link to={'/events/' + x.name}>{x.name}</Link>{' '}
                                                    <span className="mark">{x.address}</span>
                                                </div>
                                            );
                                    })}
                                    {!events || !events.length && (
                                        <div className="community-profile-comment">
                                            Brak Wydarzeń.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { User };


