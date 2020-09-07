import { checkboxState } from '../Utils/types';

const checkSlot = (state: checkboxState, date: Date) => {
    const staringHours = date.getHours();

    const { isMorningChecked, isAfternoonChecked, isEveningChecked, isNightChecked } = state;
    let slot = false;
    if (isMorningChecked || isAfternoonChecked || isEveningChecked || isNightChecked) {
        if (isMorningChecked) {
            slot = staringHours >= 6 && staringHours <= 11;
        }
        if (isAfternoonChecked) {
            slot = slot || (staringHours >= 12 && staringHours <= 16);
        }
        if (isEveningChecked) {
            slot = slot || (staringHours >= 17 && staringHours <= 20);
        }
        if (isNightChecked) {
            slot = slot || staringHours >= 21 || staringHours < 6;
        }
    } else {
        slot = true;
    }

    return slot;
};

const textFilter = (input: string | number, available: string) => {
    let match = false;

    if (available) {
        match = input.toString().toLowerCase().includes(available.toLowerCase());
    } else {
        match = true;
    }

    return match;
};

export { checkSlot, textFilter };
