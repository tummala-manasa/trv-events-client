import React, { useState, useContext, useEffect, useRef } from 'react';
import { Events } from '../Utils/types';

import FilterContext from '../Context/filter';
import { checkSlot, textFilter } from '../Utils/helpers';

import './index.css';

type FiltersProps = {
    events: Array<Events>;
    setCurrentEvents: (events: Events[]) => void;
    setFilterVisibility: (state: boolean) => void;
};

const Filters: React.FC<FiltersProps> = ({ events, setCurrentEvents, setFilterVisibility }) => {
    // state
    const [isFreeChecked, setIsFreeChecked] = useState(false);
    const [isMorningChecked, setIsMorningChecked] = useState(false);
    const [isAfternoonChecked, setIsAfternoonChecked] = useState(false);
    const [isEveningChecked, setIsEveningChecked] = useState(false);
    const [isNightChecked, setIsNightChecked] = useState(false);
    const [eventName, setEventName] = useState('');
    const [cityName, setCityName] = useState('');

    // context
    const showFilter = useContext(FilterContext);

    // Filter all parameters
    const showCurrentEvents = () => {
        const filteredEvents: Events[] = events.filter((event) => {
            return (
                // order according to complexity
                (isFreeChecked ? event.isFree : true) &&
                textFilter(event.name, eventName) &&
                textFilter(event.city, cityName) &&
                checkSlot({ isMorningChecked, isAfternoonChecked, isEveningChecked, isNightChecked }, event.startDate)
            );
        });
        setCurrentEvents(filteredEvents);
        console.log(filteredEvents);
    };

    // when check boxes change
    useEffect(() => {
        showCurrentEvents();
    }, [isFreeChecked, isMorningChecked, isAfternoonChecked, isEveningChecked, isNightChecked]);

    // when text boxes change, we debounce the handler
    const intervalRef = useRef<number>();
    useEffect(() => {
        clearInterval(intervalRef.current);
        intervalRef.current = window.setTimeout(() => {
            showCurrentEvents();
        }, 300);
    }, [eventName, cityName, events]);

    return (
        <aside className={`${showFilter ? 'show' : ''}`} id="filters">
            <input
                placeholder="Name"
                className="text"
                onChange={(e) => setEventName(e.target.value)}
                value={eventName}
            />
            <input placeholder="City" className="text" onChange={(e) => setCityName(e.target.value)} value={cityName} />
            <label>
                <input
                    type="checkbox"
                    className="checkbox"
                    checked={isFreeChecked}
                    onChange={(e) => setIsFreeChecked(e.target.checked)}
                />
                Only <span className="free">FREE</span>
            </label>
            <fieldset className="slots">
                <label>
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={isMorningChecked}
                        onChange={(e) => setIsMorningChecked(e.target.checked)}
                    />
                    Morning
                </label>
                <label>
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={isAfternoonChecked}
                        onChange={(e) => setIsAfternoonChecked(e.target.checked)}
                    />
                    Afternoon
                </label>
                <label>
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={isEveningChecked}
                        onChange={(e) => setIsEveningChecked(e.target.checked)}
                    />
                    Evening
                </label>
                <label>
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={isNightChecked}
                        onChange={(e) => setIsNightChecked(e.target.checked)}
                    />
                    Night
                </label>
            </fieldset>
            <button className="button hidden-mobile-button" onClick={(e) => setFilterVisibility(false)}>
                Done
            </button>
        </aside>
    );
};

export default Filters;
