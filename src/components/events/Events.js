import React from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { EventAddModal } from './EventAddModal';
import { eventsRef } from '../../config/firebase';
import { eventsSelector } from '../../store/reducers/data';
import { useSelector } from 'react-redux';
import { isAdminSelector } from '../../store/reducers/auth';
import { mapSportToIcon } from './helpers';

const EventsBase = ({ google }) => {
    const events = useSelector(eventsSelector);
    const isAdmin = useSelector(isAdminSelector);

    const removePointAction = (id) => {
        eventsRef.child(id).remove()
            .then(() => {
                toast.success("Item deleted");
            })
            .catch(error => {
                toast.error("Wystapil blad: " + error);
            });
    };

    return (
        <section className="section-pharmacies">
            <h3 className="section-opinions__h3">Lista wydarzeń</h3>
            <EventAddModal google={google}  />{' '}
            {events.map((x, i) => {
                return (
                    <div className="row" key={x.key}>
                        <div className="col">
                            <div className="panel-link-wrapper">
                                <Link to={'/events/' + x.name}>
                                    <div className="panel-link">
                                        <span className="panel-link-icon">
                                            <img src={mapSportToIcon(x.sport)} />
                                        </span>
                                        <span className="panel-link-name">{x.name}</span>
                                        <span className="panel-link-address">{x.address}</span>
                                    </div>
                                </Link>
                                {isAdmin && (
                                    <div
                                        className="panel-close"
                                        onClick={() => removePointAction(x.key)}
                                    >
                                        <i className="fas fa-times" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

const Events = GoogleApiWrapper({ apiKey: 'AIzaSyCNvB4QyXUU6I2gbxAI3DKCVlVESPEAAlA' })(EventsBase);

export { Events };
