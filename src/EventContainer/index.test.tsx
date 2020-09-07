import React from 'react';
import { mount } from '../setupTests';

// Components
import EventContainer from './index';

const event = {
    id: 0,
    isFree: false,
    name: 'CSS Grids: fact or fiction',
    city: 'Barcelona',
    startDate: new Date('2019-07-14T02:00:00+00:00'),
    endDate: new Date('2019-07-14T03:00:00+00:00'),
    isSignedUp: false,
};

const handleOnClick = jest.fn();
const setIsModalOpen = jest.fn();
const setModalEvent = jest.fn();

test('Check if initial comnponent is rendered', () => {
    const EventContainerWrap = mount(
        <EventContainer
            event={event}
            currentView="all"
            handleOnClick={handleOnClick}
            setIsModalOpen={setIsModalOpen}
            setModalEvent={setModalEvent}
        />,
    );

    expect(EventContainerWrap.find('.container')).toHaveLength(1);
    expect(EventContainerWrap.find('.primary')).toHaveLength(1);
    expect(EventContainerWrap.find('.secondary')).toHaveLength(1);
    expect(EventContainerWrap.find('.free')).toHaveLength(0);
    expect(EventContainerWrap.find('.title')).toHaveLength(1);
    expect(EventContainerWrap.find('.button').first().text()).toEqual('Sign up');
});

test('Check if contents are rendered in the component primary container', () => {
    event.isFree = true;
    event.isSignedUp = true;

    const EventContainerWrap = mount(
        <EventContainer
            event={event}
            currentView="all"
            handleOnClick={handleOnClick}
            setIsModalOpen={setIsModalOpen}
            setModalEvent={setModalEvent}
        />,
    );

    expect(EventContainerWrap.find('.free')).toHaveLength(1);
    expect(EventContainerWrap.find('.title').first().text()).toEqual('CSS Grids: fact or fiction');
    expect(EventContainerWrap.find('.button')).toHaveLength(0);
});

test('Check for buttons in the component primary container', () => {
    event.isSignedUp = true;

    const EventContainerWrap = mount(
        <EventContainer
            event={event}
            currentView="my"
            handleOnClick={handleOnClick}
            setIsModalOpen={setIsModalOpen}
            setModalEvent={setModalEvent}
        />,
    );

    expect(EventContainerWrap.find('.button').first().text()).toEqual('Cancel');
});

test('Check if contents are rendered in the component secondary container', () => {
    const EventContainerWrap = mount(
        <EventContainer
            event={event}
            currentView="all"
            handleOnClick={handleOnClick}
            setIsModalOpen={setIsModalOpen}
            setModalEvent={setModalEvent}
        />,
    );

    expect(EventContainerWrap.find('.para').first().text()).toEqual('Barcelona');
    expect(EventContainerWrap.find('.para').at(1).text()).toEqual("60'");
    expect(EventContainerWrap.find('.para').at(2).text()).toEqual('from 07:30 to 08:30');
});
