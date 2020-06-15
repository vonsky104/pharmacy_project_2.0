import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem } from './ListItem';
import logo from '../../assets/logosport.png';
import { useSelector } from 'react-redux';
import { isAuthSelector } from '../../store/reducers/auth';

const Menu = () => {
    const isAuth = useSelector(isAuthSelector);

    return (
        <header className="header">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="header-content">
                            <Link to={'/'} className="">
                                <img className="logo" src={logo} alt="logo" />
                            </Link>
                            <ul className="header__nav">
                                    <ListItem path={'/'} title="Mapa" />
                                    <ListItem path={'/events'} title="Wydarzenia" />
                                    <ListItem path={'/users'} title="Sportowcy" />
                                {
                                    isAuth ?
                                        <React.Fragment>
                                            <li>
                                                <Link to={'/logout'} className="btn-navigate">
                                                    Wyloguj
                                                </Link>
                                            </li>
                                        </React.Fragment>
                                    :
                                        <React.Fragment>
                                            <li>
                                                <Link to={'/signin'} className="btn-navigate">
                                                    Zaloguj
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'/register'} className="btn-navigate register">
                                                    Zarejestruj się
                                                </Link>
                                            </li>
                                        </React.Fragment>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
};

export { Menu };
