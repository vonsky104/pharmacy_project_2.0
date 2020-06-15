import React, { useState } from 'react';
import { axiosInstance as axios } from '../../config/axios-control';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import { isAuthSelector } from '../../store/reducers/auth';
import { firebaseApp } from '../../config/firebase';
import { sports } from '../../config/sports';

const sendNewUserToDatabase = ({ userId, email, userName, favouriteSport }) => {
    axios.post('/users.json', {
        id: userId,
        email,
        favourite_sport: favouriteSport,
        name: userName,
        is_boss: false,
    }).then(() => {
        toast.success('Użytkownik dodany');
        return true;
    }).catch(e => {
        toast.error('Wystąpił błąd ', e);
        return false;
    })
};

const register = ({ email, password, userName, favouriteSport }) => {
    return firebaseApp.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            const userId = user.user.uid;
            return sendNewUserToDatabase({ userId, email, userName, favouriteSport });
        })
        .catch(e => {
            toast.error('Wystąpił błąd ', e);
            return false;
        });
};

const Register = () => {
    const isAuth = useSelector(isAuthSelector);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [favouriteSport, setFavouriteSport] = useState('');
    const [registered, setRegistered] = useState(false);

    const submitHandler = event => {
        event.preventDefault();
        setRegistered(register({ email, password, userName, favouriteSport }));
    };

    if (registered) {
        return <Redirect to={'/signin'} />;
    }

    if (isAuth) {
        return <Redirect to={'/'} />;
    }

    return (
        <section className="section-form">
            <div className="SignIn form-main">
                <form onSubmit={submitHandler} autoComplete="off">
                    <h4 className="section__h4">Zarejestruj się</h4>
                    <div className="form-group email">
                        <input
                            autoComplete="new-email"
                            onChange={event => setEmail(event.target.value)}
                            className="form-control email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            required
                        />
                    </div>

                    <div className="form-group userName">
                        <input
                            autoComplete="new-username"
                            onChange={event => setUserName(event.target.value)}
                            className="form-control userName"
                            name="userName"
                            id="userName"
                            placeholder="Nazwa użytkownika"
                            value={userName}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <select
                            className="form-control"
                            required
                            onChange={e => setFavouriteSport(e.target[e.target.selectedIndex].getAttribute('value'))}
                        >
                            <option>Wybierz ulubioną dyscyplinę</option>
                            {sports.map(sport => (
                                <option key={sport} value={sport}>
                                    {sport}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group password">
                        <input
                            autoComplete="new-password"
                            onChange={event => setPassword(event.target.value)}
                            className="form-control password"
                            name="pass"
                            id="pass"
                            type="password"
                            placeholder="Hasło"
                            value={password}
                            required
                        />
                    </div>

                    <button className="btn btn-main" type="submit">
                        <span>Zarejestruj się</span>
                    </button>
                    {/*{errorMessage(error)}*/}
                </form>
            </div>
        </section>
    );
};

export { Register };
