import React, { Component } from 'react';
import './index.css';
import Header from '../Header';
import MainContent from '../MainContent';
import Filters from '../Filters';

type Events = {
    id: number;
    isFree: Boolean;
    name: string;
    city: number | string;
    startDate: Date;
    endDate: Date;
};
type City = {
    id: Number;
    name: string;
};
type AppState = {
    events: Array<Events>;
    currentEvents: Array<Events>;
};

class App extends Component<{}, AppState> {
    constructor(props: Object) {
        super(props);
        this.state = {
            events: [],
            currentEvents: [],
        };
    }

    componentDidMount() {
        const citiesAPI = fetch('http://localhost:3001/cities');
        const eventsAPI = fetch('http://localhost:3001/events');

        Promise.all([citiesAPI, eventsAPI])
            .then((response) => Promise.all([response[0].json(), response[1].json()]))
            .then((response) => {
                let cities: Array<City> = response[0];
                let events: Array<Events> = response[1];

                events = events.map((event) => {
                    let city: City | undefined = cities.find((city) => city.id === event.city);

                    return Object.assign({}, event, {
                        city: city?.name,
                        startDate: new Date(event.startDate),
                        endDate: new Date(event.endDate),
                    });
                });
                this.setState({ events });
            });
    }

    render() {
        const events: Array<Events> = this.state.events;
        return (
            <>
                <Header events={events} />
                {/* aside */}
                <Filters events={events} />
                <MainContent events={events} />
            </>
        );
    }
}

export default App;
