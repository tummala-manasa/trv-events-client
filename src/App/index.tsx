import React, { Component } from 'react';
import { Events, City } from '../Utils/types';

import Header from '../Header';
import MainContent from '../MainContent';
import Filters from '../Filters';

import './index.css';

type AppState = {
    events: Array<Events>;
    currentEvents: Array<Events>;
    currentView: string;
    showFilters: boolean;
};

class App extends Component<{}, AppState> {
    constructor(props: Object) {
        super(props);
        this.state = {
            events: [],
            currentEvents: [],
            currentView: 'all',
            showFilters: false,
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
                this.setState({ events, currentEvents: events });
            });
    }

    setCurrentEvents = (events: Array<Events>) => {
        this.setState({ currentEvents: events });
    };

    setCurrentView = (view: string) => {
        this.setState({ currentView: view });
    };

    setFilterVisibility = (state: boolean) => {
        this.setState({ showFilters: state });
    };

    updateAnEvent = (event: Events) => {
        this.setState((prevState) => {
            let newEvents = [...prevState.events];
            let tempEventInAll = newEvents.find((evt) => evt.id === event.id);
            if (tempEventInAll) {
                tempEventInAll.isSignedUp = event.isSignedUp;
            }

            let newCurrentEvents = [...prevState.currentEvents];
            let tempEventInCur = newCurrentEvents.find((evt) => evt.id === event.id);
            if (tempEventInCur) {
                tempEventInCur.isSignedUp = event.isSignedUp;
            }

            return {
                ...prevState,
                events: [...newEvents],
                currentEvents: [...newCurrentEvents],
            };
        });
    };

    render() {
        const events: Array<Events> = this.state.events;
        return (
            <>
                <Header events={events} setCurrentView={this.setCurrentView} currentView={this.state.currentView} />
                <Filters
                    events={events}
                    setCurrentEvents={this.setCurrentEvents}
                    setFilterVisibility={this.setFilterVisibility}
                    showFilters={this.state.showFilters}
                />
                {events.length > 0 && (
                    <MainContent
                        events={events}
                        currentEvents={this.state.currentEvents}
                        updateAnEvent={this.updateAnEvent}
                        currentView={this.state.currentView}
                        setFilterVisibility={this.setFilterVisibility}
                        showFilters={this.state.showFilters}
                    />
                )}
            </>
        );
    }
}

export default App;
