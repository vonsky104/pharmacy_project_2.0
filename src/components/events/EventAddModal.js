import React  from 'react';
import { axiosInstance as axios } from '../../config/axios-control';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { sports } from '../../config/sports';
import { toast } from 'react-toastify';
import { geocodeAddress } from './helpers';
import { fetchData } from '../../store/actions';

class EventAddModalBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            desc: '',
            limit: null,
            lat: '',
            lng: '',
            name: '',
            sport: '',
            address: '',
            time: null,
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    changeHandler = (e, property) => this.setState({ [property]: e.target.value });

    handleGeocode = () => {
        const { date, desc, limit, name, sport, address, time } = this.state;
        if (
            date === null || desc === '' || limit === null || name === ''
            || sport === '' || this.props.userid === '' || address === '' || time === null) {
            toast.error('Uzupełnij wszystkie pola');
            return false;
        }

        geocodeAddress(this.state.address, this.props.google)
            .then((response) => {
                if (!response) toast.error('Wystąpił błąd');
                const { lat, lng } = response;

                axios.post('/events.json', {
                    date, desc, lat, lng, limit, name, sport, address,
                    time, userId: this.props.userId,
                    activePeople: [this.props.userId], comments: [],})
                    .then(() => {
                        this.toggle();
                        this.setState({
                            date: null, desc: '', limit: null, lat: '',
                            lng: '', name: '', sport: '', address: '', time: null,});
                        this.props.fetchData();
                        return toast.success('Wydarzenie dodane');
                    })
                    .catch(e => toast.error('Wystąpił błąd: ', e))
            });
    };

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                {this.props.isAuth ? (
                    <Button className="btn-main add-pharmacy" onClick={this.toggle}>
                        Dodaj nowe wydarzenie
                    </Button>
                ) : null}

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    size={'lg'}
                    centered={true}
                >
                    <ModalHeader toggle={this.toggle}>Nowe wydarzenie</ModalHeader>
                    <ModalBody>
                        <div
                            style={{
                                marginBottom: 20 + 'px'
                            }}
                            className="row justify-content-center"
                        >
                            <div className="col-6">
                                <form className="form" action="" method="post">
                                    <div className="form-group">
                                        <label htmlFor="">Nazwa</label>
                                        <input
                                            onChange={e => this.changeHandler(e, 'name')}
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="">Opis</label>
                                        <input
                                            onChange={e => this.changeHandler(e, 'desc')}
                                            type="text"
                                            className="form-control"
                                            name="description"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="">Data</label>
                                        <input
                                            onChange={e => this.changeHandler(e, 'date')}
                                            type="date"
                                            name="date"
                                            min={new Date()}
                                            className="form-control"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="">Godzina</label>
                                        <input
                                            onChange={e => this.changeHandler(e, 'time')}
                                            type="time"
                                            name="time"
                                            className="form-control"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="">Limit osób</label>
                                        <input
                                            onChange={e => this.changeHandler(e, 'limit')}
                                            type="number"
                                            min="1"
                                            max="99"
                                            className="form-control"
                                            id="limit"
                                            name="limit"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="">Dyscyplina</label>
                                        <select
                                            className="form-control"
                                            required
                                            onChange={e => this.setState({'sport': e.target[e.target.selectedIndex].getAttribute('value')})}
                                        >
                                            <option>Wybierz dyscyplinę</option>
                                            {sports.map(sport => (
                                                <option key={sport} value={sport}>
                                                    {sport}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="">Miejsce</label>
                                        <input
                                            onChange={e => this.changeHandler(e, 'address')}
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            name="address"
                                            required
                                        />
                                    </div>
                                    <div className="section__btns">
                                        <button
                                            type="button"
                                            onClick={() => this.handleGeocode()}
                                            className="btn btn-main"
                                        >
                                            Dodaj
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        isAuth: state.auth.userId !== null,
        userId: state.auth.userId,
        user: state.auth.user
    };
};

const mapDispatchToProps = dispatch => ({
    fetchData: () => dispatch(fetchData()),
});

const EventAddModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(EventAddModalBase);

export { EventAddModal };
