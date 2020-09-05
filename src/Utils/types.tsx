export type Events = {
    id: number;
    isFree: boolean;
    name: string;
    city: number | string;
    startDate: Date;
    endDate: Date;
    isSignedUp: boolean;
};

export type City = {
    id: Number;
    name: string;
};

export type checkboxState = {
    isMorningChecked: boolean;
    isAfternoonChecked: boolean;
    isEveningChecked: boolean;
    isNightChecked: boolean;
};
