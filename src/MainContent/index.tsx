import React, { useContext, useState } from 'react';
import { Events } from '../Utils/types';

import FilterContext from '../Context/filter';
import Modal from '../Modal';
import EventContainer from '../EventContainer';

import './index.css';

type HeaderProps = {
    currentEvents: Array<Events>;
    currentView: string;
    updateAnEvent: (event: Events) => void;
    setFilterVisibility: (state: boolean) => void;
};

const MainContent: React.FC<HeaderProps> = ({ currentEvents, currentView, updateAnEvent, setFilterVisibility }) => {
    // state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalEvent, setModalEvent] = useState<Events>();

    // context
    const showFilter = useContext(FilterContext);

    const handleOnClick = (event: Events, state: boolean) => {
        fetch(`http://localhost:3001/events/${event.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isSignedUp: state }),
        })
            .then((response) => response.json())
            .then((response) => {
                updateAnEvent(response);
            });
    };

    // Process display
    let hash: { [k: string]: Array<Events> } = {};

    currentEvents.forEach((event) => {
        // group by date
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
            const show = currentView === 'all' || (currentView === 'my' && event.isSignedUp);
            if (!show) return null;

            return (
                <EventContainer
                    key={event.id}
                    event={event}
                    handleOnClick={handleOnClick}
                    currentView={currentView}
                    setModalEvent={setModalEvent}
                    setIsModalOpen={setIsModalOpen}
                />
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
        <section className={`${showFilter ? 'hide' : ''} ${isModalOpen ? 'noscroll' : ''}`} id="main-content">
            <Modal
                open={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                modalEvent={modalEvent}
                handleOnClick={handleOnClick}
            />
            <button className="button hidden-mobile-button" onClick={(e) => setFilterVisibility(true)}>
                Filters
            </button>
            {eventList.length ? eventList : <div>This view has no events</div>}
        </section>
    );
};

export default MainContent;
