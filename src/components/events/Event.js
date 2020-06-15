import React, { useState , useEffect} from 'react';
import { Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { eventFromStoreSelector, usersSelector } from '../../store/reducers/data';
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { eventsRef } from '../../config/firebase';
import { isAuthSelector, userIdSelector } from '../../store/reducers/auth';
import { fetchData } from '../../store/actions';
import { mapSportToIcon } from './helpers';
import { Map } from '../map/Map';

const Event = (props) => {
    const dispatch = useDispatch();
    const event = useSelector(eventFromStoreSelector(props.match.params.event));
    const isAuth = useSelector(isAuthSelector);
    const userId = useSelector(userIdSelector);
    const users = useSelector(usersSelector);

    const [comment, setComment] = useState('');

    if (!event) return <div></div>;

    const { activePeople, comments } = event;

    const hasJoined = isAuth && activePeople.findIndex(e => e === userId) > -1;

    const getUser = (x) => {
        return users.find(u => u.id === x);
    };

    const sendComment = () => {
        if (comment === '') return false;
        let commentsToSpread = !comments ? [] : comments;

        eventsRef.child(event.key).set({
            ...event,
            comments: [...commentsToSpread, {
                desc: comment,
                id: userId,
                name: getUser(userId).id
            }]
        }).then(() => {
            dispatch(fetchData());
            toast.success('Komentarz dodany');
        })
    };

    const joinEvent = () => {
        if (hasJoined) return false;

        eventsRef.child(event.key).set({
            ...event,
            activePeople: [...activePeople, userId]
        }).then(() => {
            dispatch(fetchData());
            toast.success('Dołączyłeś do wydarzenia');
        })
    };

    const leaveEvent = () => {
        if (!hasJoined) return false;

        eventsRef.child(event.key).set({
            ...event,
            activePeople: activePeople.filter(e => e !== userId)
        }).then(() => {
            dispatch(fetchData());
            return toast.success('added');
        })
    };

    return (
        <section className="section-pharmacies">
                        <div className="row">
                            <div className="col">
                                <div className="community-profile">
                                    <div className="row">
                                        <div className="col-3">
                                            <div className="community-profile-info">
                                                <div className="community-profile__photo">
                                                    <img src={mapSportToIcon(event.sport)} />
                                                </div>
                                                {
                                                    isAuth ?
                                                    <Button className="btn-main marginHorizontal" onClick={hasJoined ? () => leaveEvent() : () => joinEvent()}>
                                                        { !hasJoined ? 'Dołącz do wydarzenia' : 'Opuść wydarzenie' }
                                                    </Button> : <h5>Aby dołączyć, <Link to={'/signin'}>zaloguj się</Link></h5>
                                                }

                                                <h3 className="community-profile__h3">{event.name}</h3>
                                                <p className="community-profile-description">
                                                    <i
                                                        className="fa fa-pencil"
                                                        aria-hidden="true"
                                                    /> Opis: {event.desc}
                                                </p>
                                                <p className="community-profile-description">
                                                    <i
                                                        className="fa fa-map-marker"
                                                        aria-hidden="true"
                                                    />
                                                    {event.address}
                                                </p>
                                                <p className="community-profile-description">
                                                    <i
                                                        className="fa fa-calendar"
                                                        aria-hidden="true"
                                                    /> Data wydarzenia: {event.date}
                                                </p>
                                                <p className="community-profile-description">
                                                    <i
                                                        className="fa fa-clock"
                                                        aria-hidden="true"
                                                    /> Godzina: {event.time}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-5">
                                            <div className="community-profile-content">
                                                <h3 className="community-profile__h3">Komentarze</h3>
                                                {isAuth ? (
                                                    <form className="community-profile__form">
                                                      <textarea
                                                          onChange={event => setComment(event.target.value)}
                                                          className="community-profile__textarea"
                                                          rows="4"
                                                          cols="50"
                                                          placeholder="Treść komentarza..."
                                                      />
                                                        <button
                                                            onClick={() => sendComment()}
                                                            className="btn btn-main btn-publish"
                                                            type="button"
                                                        >
                                                            Opublikuj
                                                        </button>
                                                    </form>
                                                ) : null}
                                                {comments && comments.length &&
                                                    comments.map((x) => (
                                                        <div
                                                            key={x.desc}
                                                            className="community-profile-comment"
                                                        >
                                                            <p>{x.desc}</p>{' '}
                                                            {<p>
                                                                Przez:{' '}
                                                                <Link to={`/users/${x.id}`}>
                                                                    {x.name}
                                                                </Link>
                                                            </p>}
                                                        </div>
                                                    ))
                                                }
                                                {(!comments || !comments.length) && (
                                                    <div className="community-profile-comment">
                                                        Brak komentarzy.
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="community-profile-products">
                                                <h3 className="community-profile__h3">
                                                    Lista biorących udział
                                                </h3>

                                                {activePeople && activePeople.length && <div
                                                    className={'community-profile-product'}
                                                >
                                                    {
                                                        activePeople.map((x) => {
                                                            const user = getUser(x);
                                                            return (
                                                                <span key={user.id}
                                                                      className="community-profile-product-name">
                                                                    <Link to={`/users/${user.id}`}>
                                                                        {user.name}
                                                                    </Link>
                                                                </span>
                                                            );
                                                        })
                                                    }

                                                </div>}

                                                {(!activePeople || !activePeople.length) && (
                                                    <div className="community-profile-product">
                                                        Nikt jeszcze nie bierze udziału.
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="panel map-column map-column-nofloat">
                                        <div className="section-welcome-map__wrapper">
                                            <Map
                                                event={true}
                                                dataFromNavigation={[]}
                                                destSearch={false}
                                                hereLat={event.lat}
                                                hereLng={event.lng}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
        </section>
    );
};

export { Event as EventPage };
