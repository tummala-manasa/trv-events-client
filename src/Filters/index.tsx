import React, { Component } from 'react';
// import './index.css';

// todo: try to add this in common place
type Events = {
    id: number;
    isFree: boolean;
    name: string;
    city: number | string;
    startDate: Date;
    endDate: Date;
};
type FiltersProps = {
    events: Array<Events>;
    setCurrentEvents: (events: Events[]) => void;
};
type FiltersState = {
    isFreeChecked: boolean;
    isMorningChecked: boolean;
    isAfternoonChecked: boolean;
    isEveningChecked: boolean;
    isNightChecked: boolean;
    eventName: string;
    cityName: string;
};

class Filters extends Component<FiltersProps, FiltersState> {
    constructor(props: FiltersProps) {
        super(props);
        this.state = {
            isFreeChecked: false,
            isMorningChecked: false,
            isAfternoonChecked: false,
            isEveningChecked: false,
            isNightChecked: false,
            eventName: '',
            cityName: '',
        };
    }

    handleCheckbox: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;
        if (name === 'free') {
            this.setState({ isFreeChecked: checked }, this.showCurrentEvents);
        } else if (name === 'morning') {
            this.setState({ isMorningChecked: checked }, this.showCurrentEvents);
        } else if (name === 'afternoon') {
            this.setState({ isAfternoonChecked: checked }, this.showCurrentEvents);
        } else if (name === 'evening') {
            this.setState({ isEveningChecked: checked }, this.showCurrentEvents);
        } else if (name === 'night') {
            this.setState({ isNightChecked: checked }, this.showCurrentEvents);
        }
    };

    debounce = (fn: () => void, delay = 300) => {
        let timer: number;
        return () => {
            clearTimeout(timer);
            timer = window.setTimeout(() => {
                fn();
            }, delay);
        };
    };

    handleText = this.debounce(() => {
        this.showCurrentEvents();
    });

    showCurrentEvents = () => {
        let events = this.props.events;
        events = events.filter((event) => {
            let condition = true,
                slot = false,
                name = false,
                city = false;
            const {
                isMorningChecked,
                isAfternoonChecked,
                isEveningChecked,
                isNightChecked,
                eventName,
                cityName,
            } = this.state;

            const staringHours = event.startDate.getHours();
            if (isMorningChecked || isAfternoonChecked || isEveningChecked || isNightChecked) {
                if (isMorningChecked) {
                    slot = staringHours >= 6 && staringHours <= 12;
                }
                if (isAfternoonChecked) {
                    slot = slot || (staringHours > 12 && staringHours <= 17);
                }
                if (isEveningChecked) {
                    slot = slot || (staringHours > 17 && staringHours <= 21);
                }
                if (isNightChecked) {
                    slot = slot || staringHours > 21 || staringHours < 6;
                }
            } else {
                slot = true;
            }

            if (eventName) {
                name = event.name.toLowerCase().includes(eventName.toLowerCase());
            } else {
                name = true;
            }

            if (cityName) {
                city = event.city.toString().toLowerCase().includes(cityName.toLowerCase());
            } else {
                city = true;
            }

            condition = slot && name && city && (this.state.isFreeChecked ? event.isFree : true);

            return condition;
        });
        this.props.setCurrentEvents(events);
        console.log(events);
    };

    render() {
        // todo: change styles to classes
        return (
            <aside>
                <input
                    placeholder="Name"
                    className="text"
                    onChange={(e) => {
                        this.setState({ eventName: e.target.value });
                        this.handleText();
                    }}
                    value={this.state.eventName}
                />
                <input
                    placeholder="City"
                    className="text"
                    onChange={(e) => {
                        this.setState({ cityName: e.target.value });
                        this.handleText();
                    }}
                    value={this.state.cityName}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={this.state.isFreeChecked}
                        name="free"
                        onChange={this.handleCheckbox}
                    />
                    Only <span className="free">FREE</span>
                </label>
                <fieldset>
                    <label>
                        <input
                            type="checkbox"
                            checked={this.state.isMorningChecked}
                            name="morning"
                            onChange={this.handleCheckbox}
                        />
                        Morning
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={this.state.isAfternoonChecked}
                            name="afternoon"
                            onChange={this.handleCheckbox}
                        />
                        Afternoon
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={this.state.isEveningChecked}
                            name="evening"
                            onChange={this.handleCheckbox}
                        />
                        Evening
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={this.state.isNightChecked}
                            name="night"
                            onChange={this.handleCheckbox}
                        />
                        Night
                    </label>
                </fieldset>
            </aside>
        );
    }
}

export default Filters;
