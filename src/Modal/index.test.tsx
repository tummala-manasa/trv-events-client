import React from 'react';
import { mount } from '../setupTests';

// Components
import Modal from './index';

const handleOnClick = jest.fn();
const setIsModalOpen = jest.fn();
const modalEvent = {
    id: 0,
    isFree: true,
    name: 'CSS Grids: fact or fiction',
    city: 'Barcelona',
    startDate: new Date('2019-07-14T02:00:00+00:00'),
    endDate: new Date('2019-07-14T03:00:00+00:00'),
    isSignedUp: false,
};

test('Check if initial comnponent is rendered', () => {
    const ModalWrap = mount(
        <Modal handleOnClick={handleOnClick} setIsModalOpen={setIsModalOpen} modalEvent={modalEvent} open={true} />,
    );

    expect(ModalWrap.find('.button')).toHaveLength(2);
    expect(ModalWrap.find('.modal')).toHaveLength(1);
    expect(ModalWrap.find('.modal-overlay')).toHaveLength(1);
});

test('Check for null case', () => {
    const ModalWrap = mount(
        <Modal handleOnClick={handleOnClick} setIsModalOpen={setIsModalOpen} modalEvent={modalEvent} open={false} />,
    );

    expect(ModalWrap.find('.button')).toHaveLength(0);
    expect(ModalWrap.find('.modal')).toHaveLength(0);
    expect(ModalWrap.find('.modal-overlay')).toHaveLength(0);
});
