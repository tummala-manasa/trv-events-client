import React from 'react';
import { mount } from '../setupTests';

// Components
import Header from './index';

const setCurrentView = jest.fn();

test('Check if initial comnponent is rendered', () => {
    const HeaderWrap = mount(<Header setCurrentView={setCurrentView} currentView={'all'} />);

    expect(HeaderWrap.find('.button')).toHaveLength(2);
    expect(HeaderWrap.find('a')).toHaveLength(1);
    expect(HeaderWrap.find('.active').first().text()).toEqual('All events');
});

test('Check my events view', () => {
    const HeaderWrap = mount(<Header setCurrentView={setCurrentView} currentView={'my'} />);

    expect(HeaderWrap.find('.button')).toHaveLength(2);
    expect(HeaderWrap.find('.active').first().text()).toEqual('My events');
});
