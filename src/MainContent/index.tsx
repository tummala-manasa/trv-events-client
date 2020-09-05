import React, { Component } from 'react';
import { Events } from '../Utils/types';

import './index.css';

type HeaderProps = {
    currentEvents: Array<Events>;
    currentView: string;
    updateAnEvent: (event: Events) => void;
    setFilterVisibility: (state: boolean) => void;
    showFilters: boolean;
};

class MainContent extends Component<HeaderProps, {}> {
    handleOnClick = (event: Events, state: boolean) => {
        if (!state || window.confirm(`Confirm sign up for the event "${event.name}"`)) {
            fetch(`http://localhost:3001/events/${event.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isSignedUp: state }),
            })
                .then((response) => response.json())
                .then((response) => {
                    this.props.updateAnEvent(response);
                });
        }
    };

    render() {
        const events = this.props.currentEvents;
        let hash: { [k: string]: Array<Events> } = {};

        events.forEach((event) => {
            let date = event.startDate;
            let dateKey: string = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
            if (hash[dateKey]) {
                hash[dateKey].push(event);
            } else {
                hash[dateKey] = [event];
            }
        });

        let eventList = Object.entries(hash).map((arr) => {
            let block = arr[1].map((event) => {
                const startDate = event.startDate;
                const endDate = event.endDate;
                const duration = (endDate.getTime() - startDate.getTime()) / 60000;
                const show = this.props.currentView === 'all' || (this.props.currentView === 'my' && event.isSignedUp);
                if (!show) return null;

                return (
                    <div className="container" key={event.id}>
                        <div className="primary">
                            {event.isFree && <span className="free">FREE</span>}
                            <h2 className="title">{event.name}</h2>
                            {event.isSignedUp && this.props.currentView === 'my' && (
                                <button className="button" onClick={(e) => this.handleOnClick(event, false)}>
                                    Cancel
                                </button>
                            )}
                            {!event.isSignedUp && (
                                <button className="button" onClick={(e) => this.handleOnClick(event, true)}>
                                    Sign up
                                </button>
                            )}
                        </div>
                        <div className="secondary">
                            <p className="para">{event.city}</p>
                            <p className="para">{duration}'</p>
                            {/* todo: make 0:0 as 00:00 */}
                            <p className="para">
                                from {startDate.getHours()}:{startDate.getMinutes()} to {endDate.getHours()}:
                                {endDate.getMinutes()}
                            </p>
                        </div>
                    </div>
                );
            });
            block = block.filter((block) => block);
            if (!block.length) return null;

            return (
                <li key={arr[0]}>
                    <p className="para">{arr[0]}</p>
                    {block}
                </li>
            );
        });
        eventList = eventList.filter((event) => event);

        return (
            <section className={`${this.props.showFilters ? 'hide' : ''}`} id="main-content">
                <button className="button hidden-mobile-button" onClick={(e) => this.props.setFilterVisibility(true)}>
                    Filters
                </button>
                {eventList.length ? eventList : <div>This view has no events</div>}
            </section>
        );
    }
}

export default MainContent;
