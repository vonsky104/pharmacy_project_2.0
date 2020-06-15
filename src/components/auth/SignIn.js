import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { errorMessage } from './helpers';
import { signIn } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthSelector } from '../../store/reducers/auth';

const SignIn = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthSelector);

    const onAuth = (email, password) => dispatch(signIn(email, password));
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = event => {
        event.preventDefault();
        if (email !== '' && password !== '') {
            onAuth(email, password);
        } else {
            toast.error('Wystapil błąd');
        }
    };

    if (isAuth) {
        return <Redirect to={'/'} />;
    }

    return (
        <section className="section-form">
            <div className="SignIn form-main">
                <form onSubmit={submitHandler} autoComplete="off">
                    <h4 className="section__h4">Zaloguj się</h4>
                    <div className="form-group user">
                        <input
                            autoComplete="new-user"
                            onChange={event => setEmail(event.target.value)}
                            className="form-control email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            required
                        />
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
                        <span>Zaloguj się</span>
                    </button>
                </form>
            </div>
        </section>
    )
};

export { SignIn };
