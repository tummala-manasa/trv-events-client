import React from 'react';
import { mount } from '../setupTests';

// Components
import MainContent from './index';
import Modal from '../Modal';
import EventContainer from '../EventContainer';

const updateAnEvent = jest.fn();
const setFilterVisibility = jest.fn();
const currentEvents = [
    {
        id: 0,
        isFree: true,
        name: 'CSS Grids: fact or fiction',
        city: 'Barcelona',
        startDate: new Date('2019-07-14T02:00:00+00:00'),
        endDate: new Date('2019-07-14T03:00:00+00:00'),
        isSignedUp: false,
    },
    {
        id: 1,
        isFree: true,
        name: "Git Deep: A look at some of Git's powerful, underused features",
        city: 'Seville',
        startDate: new Date('2019-06-09T21:30:00+00:00'),
        endDate: new Date('2019-06-09T23:50:00+00:00'),
        isSignedUp: false,
    },
];

test('Check if initial comnponent is rendered', () => {
    const MainContentWrap = mount(
        <MainContent
            currentEvents={currentEvents}
            updateAnEvent={updateAnEvent}
            currentView={'all'}
            setFilterVisibility={setFilterVisibility}
        />,
    );

    expect(MainContentWrap.find(Modal)).toHaveLength(1);
    expect(MainContentWrap.find('li')).toHaveLength(2);
    expect(MainContentWrap.find(EventContainer)).toHaveLength(2);
    expect(MainContentWrap.find('p').first().text()).toEqual('14-6-2019');
});
