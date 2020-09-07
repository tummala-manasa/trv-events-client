import React from 'react';
import { mount } from '../setupTests';

// Components
import App from './index';
import Header from '../Header';
import Filters from '../Filters';
import MainContent from '../MainContent';

const events = [
    {
        id: 0,
        isFree: true,
        name: 'CSS Grids: fact or fiction',
        city: 'Barcelona',
        startDate: '2019-07-14T02:00:00+00:00',
        endDate: '2019-07-14T03:00:00+00:00',
        isSignedUp: false,
    },
    {
        id: 1,
        isFree: true,
        name: "Git Deep: A look at some of Git's powerful, underused features",
        city: 'Seville',
        startDate: '2019-06-09T21:30:00+00:00',
        endDate: '2019-06-09T23:50:00+00:00',
        isSignedUp: false,
    },
];

test('Check if initial comnponent is rendered', () => {
    const AppWrap = mount(<App />);
    expect(AppWrap.find(Header)).toHaveLength(1);
    expect(AppWrap.find(Filters)).toHaveLength(1);
    expect(AppWrap.find(MainContent)).toHaveLength(0);
});

test('Check if loaded comnponent is rendered', () => {
    const AppWrap = mount(<App />);
    AppWrap.setState({ events });

    expect(AppWrap.find(Header)).toHaveLength(1);
    expect(AppWrap.find(Filters)).toHaveLength(1);
    expect(AppWrap.find(MainContent)).toHaveLength(1);
});
