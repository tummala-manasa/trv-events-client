import React, { Component } from 'react';
import { Events } from '../Utils/types';

import './index.css';

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
                    <a href="/">About</a>
                </span>
            </header>
        );
    }
}

export default Header;
