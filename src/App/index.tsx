import React, { PureComponent } from 'react';
import { Events, City } from '../Utils/types';

import Header from '../Header';
import MainContent from '../MainContent';
import Filters from '../Filters';
import FilterContext from '../Context/filter';

import './index.css';

type AppState = {
    events: Array<Events>;
    currentEvents: Array<Events>;
    currentView: string;
    showFilters: boolean;
};

class App extends PureComponent<{}, AppState> {
    constructor(props: Object) {
        super(props);
        this.state = {
            events: [], // all events
            currentEvents: [], // events displayed on screen
            currentView: 'all',
            showFilters: false, // toggle button in mobile view
        };
    }

    componentDidMount() {
        const citiesAPI = fetch('http://localhost:3001/cities');
        const eventsAPI = fetch('http://localhost:3001/events');

        Promise.all([citiesAPI, eventsAPI]) // make parallel calls
            .then((response) => Promise.all([response[0].json(), response[1].json()]))
            .then((response) => {
                let cities: Array<City> = response[0];
                let events: Array<Events> = response[1];

                events = events.map((event) => {
                    let city: City | undefined = cities.find((city) => city.id === event.city);

                    return Object.assign({}, event, {
                        city: city?.name, // replacing city ID with name
                        startDate: new Date(event.startDate), // converting string to date
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
        // After post call for sign up, we manually update events
        this.setState((prevState) => {
            // Updating events
            let newEvents = [...prevState.events];
            let tempEventInAll = newEvents.find((evt) => evt.id === event.id);
            if (tempEventInAll) {
                tempEventInAll.isSignedUp = event.isSignedUp;
            }

            // Updating current events
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
                <Header setCurrentView={this.setCurrentView} currentView={this.state.currentView} />
                <FilterContext.Provider value={this.state.showFilters}>
                    <Filters
                        events={events}
                        setCurrentEvents={this.setCurrentEvents}
                        setFilterVisibility={this.setFilterVisibility}
                    />
                    {events.length > 0 && (
                        <MainContent
                            currentEvents={this.state.currentEvents}
                            updateAnEvent={this.updateAnEvent}
                            currentView={this.state.currentView}
                            setFilterVisibility={this.setFilterVisibility}
                        />
                    )}
                </FilterContext.Provider>
            </>
        );
    }
}

export default App;
