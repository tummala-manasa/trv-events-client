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
};

class Filters extends Component<FiltersProps, FiltersState> {
    constructor(props: FiltersProps) {
        super(props);
        this.state = {
            isFreeChecked: false,
            isMorningChecked: false,
        };
    }

    handleCheckbox: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        let name = e.target.name;
        const checked = e.target.checked;
        if (name === 'free') {
            this.setState({ isFreeChecked: checked }, this.showCurrentEvents);
        } else if (name === 'morning') {
            this.setState({ isMorningChecked: checked }, this.showCurrentEvents);
        }
    };
    showCurrentEvents = () => {
        let events = this.props.events;
        events = events.filter((event) => {
            let condition = true;

            const staringHours = event.startDate.getHours();
            let slot = 'night';
            if (staringHours >= 6 && staringHours <= 12) {
                slot = 'morning';
            } else if (staringHours > 12 && staringHours <= 17) {
                slot = 'afternoon';
            } else if (staringHours > 17 && staringHours <= 21) {
                slot = 'evening';
            }

            condition = condition && (this.state.isFreeChecked ? event.isFree : true);
            condition = condition && (this.state.isMorningChecked ? slot === 'morning' : true);
            // condition = condition && this.state.isMorningChecked? slot === 'morning' : true;

            return condition;
        });
        this.props.setCurrentEvents(events);
        console.log(events);
    };

    render() {
        // const currentView: string = this.state.currentView;
        // todo: change styles to classes
        return (
            <aside>
                <input placeholder="Name" className="text" />
                <input placeholder="City" className="text" />
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
                        <input type="checkbox" />
                        Afternoon
                    </label>
                    <label>
                        <input type="checkbox" />
                        Evening
                    </label>
                    <label>
                        <input type="checkbox" />
                        Night
                    </label>
                </fieldset>
            </aside>
        );
    }
}

export default Filters;
