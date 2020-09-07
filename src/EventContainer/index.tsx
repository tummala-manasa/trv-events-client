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

    const formatTime = (n: number) => {
        if (n >= 0 && n <= 9) {
            return '0' + n;
        }
        return n;
    };

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
                <p className="para">
                    <svg className="clock" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 466.008 466.008">
                        <g>
                            <path
                                d="M233.004,0C104.224,0,0,104.212,0,233.004c0,128.781,104.212,233.004,233.004,233.004
				c128.782,0,233.004-104.212,233.004-233.004C466.008,104.222,361.796,0,233.004,0z M233.004,436.008
				C121.067,436.008,30,344.941,30,233.004S121.067,30,233.004,30s203.004,91.067,203.004,203.004S344.941,436.008,233.004,436.008z
				"
                            />
                            <path
                                d="M233.004,63.028c-8.284,0-15,6.716-15,15v149.507l-59.991,71.325c-5.333,6.34-4.516,15.802,1.824,21.135
				c6.34,5.333,15.804,4.514,21.135-1.824l63.512-75.511c2.273-2.703,3.521-6.123,3.521-9.655V78.028
				C248.004,69.743,241.289,63.028,233.004,63.028z"
                            />
                        </g>
                    </svg>
                    from {formatTime(startDate.getHours())}:{formatTime(startDate.getMinutes())} to{' '}
                    {formatTime(endDate.getHours())}:{formatTime(endDate.getMinutes())}
                </p>
            </div>
        </div>
    );
};

export default EventContainer;
