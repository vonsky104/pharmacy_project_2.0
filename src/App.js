import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Layout } from './components/layout/Layout';
import { Logout } from './components/utils/Logout';
import { SignIn } from './components/auth/SignIn';
import { Register } from './components/auth/Register';
import { Main } from './Main';
import { Users } from './components/users/Users';
import { Events } from './components/events/Events';
import { Dashboard } from './components/dashboard/Dashboard';
import { Observed } from './components/observed/Observed';
import { User } from './components/users/User';
import { fetchData } from './store/actions/data';
import { EventPage } from './components/events/Event';

class App extends Component {
    componentDidMount() {
        this.props.fetchData();
    }
    render() {
        return (
            <Layout loaded={false}>
                <ToastContainer />
                <Switch>
                    <Route path={'/'} exact component={Main} />
                    <Route path={'/users'} exact component={Users} />
                    <Route path={'/users/:user'} exact component={User} />
                    <Route path={'/events'} exact component={Events} />
                    <Route path={'/events/:event'} exact component={EventPage} />
                    <Route path={'/signin'} exact component={SignIn} />
                    <Route path={'/register'} exact component={Register} />
                    <Route path={'/logout'} exact component={Logout} />
                    <Route path={'/dashboard'} exact component={Dashboard} />
                    <Route path={'/observed'} exact component={Observed} />
                </Switch>
            </Layout>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchData: () => dispatch(fetchData()),
});

export default connect(undefined, mapDispatchToProps)(App);
