import React, { Component } from 'react';
// import './index.css';

// todo: try to add this in common place
type Events = {
    id: number;
    isFree: Boolean;
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
};

class Filters extends Component<FiltersProps, FiltersState> {
    constructor(props: FiltersProps) {
        super(props);
        this.state = {
            isFreeChecked: false,
        };
    }

    handleCheckbox: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        let name = e.target.name;
        const checked = e.target.checked;
        if (name === 'free') {
            this.setState({ isFreeChecked: checked }, this.showCurrentEvents);
        }
    };
    showCurrentEvents = () => {
        let events = this.props.events;
        events = events.filter((event) => {
            if (this.state.isFreeChecked) {
                return event.isFree;
            } else {
                return event;
            }
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
                        <input type="checkbox" onChange={this.handleCheckbox} />
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
