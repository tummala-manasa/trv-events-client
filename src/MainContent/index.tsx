import React, { Component } from 'react';
import { Events } from '../Utils/types';

import './index.css';

type HeaderProps = {
    events: Array<Events>;
    currentEvents: Array<Events>;
    updateAnEvent: (event: Events) => void;
};

class MainContent extends Component<HeaderProps, {}> {
    handleOnClick = (event: Events) => {
        if (window.confirm(`Confirm sign up for the event "${event.name}"`)) {
            fetch(`http://localhost:3001/events/${event.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isSignedUp: true }),
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

        const eventList = Object.entries(hash).map((arr) => {
            const block = arr[1].map((event) => {
                const startDate = event.startDate;
                const endDate = event.endDate;
                const duration = (endDate.getTime() - startDate.getTime()) / 60000;

                return (
                    <div className="block" key={event.id}>
                        <div className="block1">
                            {event.isFree && <span className="free">FREE</span>}
                            <h2 className="head">{event.name}</h2>
                            {!event.isSignedUp && (
                                <button className="button" onClick={(e) => this.handleOnClick(event)}>
                                    Sign up
                                </button>
                            )}
                        </div>
                        <div className="block2">
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
            return (
                <li key={arr[0]}>
                    <p className="para">{arr[0]}</p>
                    {block}
                </li>
            );
        });
        // todo: change styles to classes
        return <section>{eventList}</section>;
    }
}

export default MainContent;
