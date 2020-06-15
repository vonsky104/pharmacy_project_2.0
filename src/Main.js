import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import './index.css';
import { loadPosition } from './utils/helpers';
import { Map } from './components/map/Map';
import { eventsSelector } from './store/reducers/data';
import { sports } from './config/sports';

const MainBase = ({ cookies }) => {
    let child = undefined;
    const dataEvents = useSelector(eventsSelector);
    const loadPositionResponse = loadPosition(cookies);
    const hereChecked = loadPositionResponse?.success;
    const hereLat = loadPositionResponse?.hereLat;
    const hereLng = loadPositionResponse?.hereLng;
    const [xLng, setXLng] = useState('');
    const [xLat, setXLat] = useState('');
    const [select, setSelect] = useState('event');
    const [sport, setSport] = useState('');
    const [destSearch, setDestSearch] = useState(false);
    const [destMatrix, setDestMatrix] = useState('');
    const isButtonDisabled = () => Boolean(hereChecked) && xLng !== '' && xLat !== '';
    const [dataToDisplay, setDataToDisplay] = useState(dataEvents);
    useEffect(() => {
        if (sport === '') {
            setDataToDisplay(dataEvents);
        } else {
            setDataToDisplay(dataEvents.filter(e => e.sport === sport));
        }
    }, [dataEvents, sport]);

    return (
        <section className="section-welcome">
            <div className="panel navigate-column">
                <h4 className="section-welcome__h4">Znajdź wydarzenie!</h4>
                <div className="section-welcome__select-panel">
                    <h5>Dyscyplina</h5>
                    <select
                        style={{marginLeft: 0}}
                        className="form-control"
                        required
                        onChange={e => setSport(e.target[e.target.selectedIndex].getAttribute('value'))}
                    >
                        <option>Wybierz dyscyplinę</option>
                        {sports.map(sport => (
                            <option key={sport} value={sport}>
                                {sport}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="section-welcome__select-panel">
                    <h5>Wydarzenie</h5>
                    <select
                        style={{marginLeft: 0}}
                        className="form-control"
                        onChange={e => {
                            setXLng(e.target[e.target.selectedIndex].getAttribute('lng'));
                            setXLat(e.target[e.target.selectedIndex].getAttribute('lat'));
                        }}
                    >
                        <option>Wybierz wydarzenie</option>
                        {
                            dataToDisplay && dataToDisplay.map((x) => {
                                return (
                                    <option key={`${x.key}_${x.lat}`} lat={x.lat} lng={x.lng}>
                                        {x.name}
                                    </option>
                                );
                            })}
                        }

                    </select>
                </div>

                <div className="section-welcome__buttons-panel section-welcome__select-panel">
                    <button
                        disabled={!isButtonDisabled()}
                        onClick={() => setDestSearch(true)}
                        className="btn btn-main"
                    >
                        Nawiguj
                    </button>
                </div>

                {
                    !hereChecked &&
                    <div className="section-welcome__buttons-panel section-welcome__select-panel">
                        <button
                            onClick={() => loadPosition(cookies)}
                            className="btn btn-main"
                        >
                            Pobierz lokalziację
                        </button>
                    </div>
                }
            </div>

            <div className="panel map-column">
                <div className="section-welcome-map__wrapper">
                    <Map
                        ref={instance => {
                            child = instance;
                        }}
                        hereChecked={hereChecked}
                        destMatrix={destMatrix}
                        dataFromNavigation={[]}
                        destSearch={destSearch}
                        destLat={xLat}
                        destLng={xLng}
                        hereLat={hereLat}
                        hereLng={hereLng}
                    />
                </div>
            </div>
        </section>
    );
};

const Main = withCookies(MainBase);

export { Main };