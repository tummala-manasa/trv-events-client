import React, { Component } from 'react';
import './index.css';

// todo: try to add this in common place
type Events = {
    id: number;
    isFree: Boolean;
    name: string;
    city: number | string;
    startDate: Date;
    endDate: Date;
};
type HeaderProps = {
    events: Array<Events>;
};
type HeaderState = {
    currentView: string;
};

class Header extends Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps) {
        super(props);
        this.state = {
            currentView: 'all',
        };
    }

    render() {
        const currentView: string = this.state.currentView;
        // todo: change styles to classes
        return (
            <header>
                TRIVAGO
                <span className="place">
                    <button className={`${currentView === 'all' ? 'active' : ''}`}>All events</button>
                    <button className={`${currentView === 'my' ? 'active' : ''}`}>My events</button>
                    <a>About</a>
                </span>
            </header>
        );
    }
}

export default Header;
