import React from 'react';
import { mount } from '../setupTests';

// Components
import Filters from './index';

const events = [
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
const setCurrentEvents = jest.fn();
const setFilterVisibility = jest.fn();

test('Check if initial comnponent is rendered', () => {
    const FiltersWrap = mount(
        <Filters events={events} setCurrentEvents={setCurrentEvents} setFilterVisibility={setFilterVisibility} />,
    );

    expect(FiltersWrap.find('.text')).toHaveLength(2);
    expect(FiltersWrap.find('.checkbox')).toHaveLength(5);
});

test('Check state for text change', () => {
    const setState = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const useStateMock: any = (initState: any) => [initState, setState];

    const handleOnChange = jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const FiltersWrap = mount(
        <Filters events={events} setCurrentEvents={setCurrentEvents} setFilterVisibility={setFilterVisibility} />,
    );

    FiltersWrap.find('.text')
        .at(0)
        .simulate('change', { target: { value: 'bar' } });

    expect(setState).toBeTruthy();
});
