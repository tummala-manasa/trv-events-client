import React from 'react';
import { Events } from '../Utils/types';

import './index.css';

type ContainerProps = {
    event: Events;
    currentView: string;
    handleOnClick: (event: Events, state: boolean) => void;
    setIsModalOpen: (s: boolean) => void;
    setModalEvent: (e: Events) => void;
};

const EventContainer: React.FC<ContainerProps> = ({
    event,
    currentView,
    handleOnClick,
    setModalEvent,
    setIsModalOpen,
}) => {
    const startDate = event.startDate;
    const endDate = event.endDate;
    const duration = (endDate.getTime() - startDate.getTime()) / 60000;

    return (
        <div className="container" key={event.id}>
            <div className="primary">
                {event.isFree && <span className="free">FREE</span>}
                <h2 className="title">{event.name}</h2>
                {event.isSignedUp && currentView === 'my' && (
                    <button className="button" onClick={(e) => handleOnClick(event, false)}>
                        Cancel
                    </button>
                )}
                {!event.isSignedUp && (
                    <button
                        className="button"
                        onClick={(e) => {
                            setIsModalOpen(true);
                            setModalEvent(event);
                        }}
                    >
                        Sign up
                    </button>
                )}
            </div>
            <div className="secondary">
                <p className="para">{event.city}</p>
                <p className="para">{duration}'</p>
                {/* todo: make 0:0 as 00:00 */}
                <p className="para">
                    from {startDate.getHours()}:{startDate.getMinutes()} to {endDate.getHours()}:{endDate.getMinutes()}
                </p>
            </div>
        </div>
    );
};

export default EventContainer;
