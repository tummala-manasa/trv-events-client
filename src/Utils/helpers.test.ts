// Components
import { textFilter, checkSlot } from './helpers';
import { stat } from 'fs';

test('Check for textFilters function', () => {
    expect(textFilter('barcelona', 'bar')).toBe(true);
    expect(textFilter('barcelona', 'vil')).toBe(false);
    expect(textFilter('Barcelona', 'bar')).toBe(true);
});

test('Check for checkSlot function', () => {
    const state = {
        isMorningChecked: true,
        isAfternoonChecked: false,
        isEveningChecked: false,
        isNightChecked: false,
    };

    expect(checkSlot(state, new Date('2019-07-03T18:30:00+00:00'))).toBe(false);
    expect(checkSlot(state, new Date('2019-07-14T02:00:00+00:00'))).toBe(true);

    state.isNightChecked = true;
    expect(checkSlot(state, new Date('2019-07-03T18:30:00+00:00'))).toBe(true);
    expect(checkSlot(state, new Date('2019-07-14T02:00:00+00:00'))).toBe(true);
});
