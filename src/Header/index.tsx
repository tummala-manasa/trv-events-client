import React, { Component } from 'react';
import { Events } from '../Utils/types';

import './index.css';

type HeaderProps = {
    events: Array<Events>;
    currentView: string;
    setCurrentView: (v: string) => void;
};

class Header extends Component<HeaderProps, {}> {
    render() {
        const currentView: string = this.props.currentView;
        return (
            <header className="header">
                TRIVAGO
                <span className="place">
                    <button
                        className={`button anchor-button ${currentView === 'all' ? 'active' : ''}`}
                        onClick={(e) => this.props.setCurrentView('all')}
                    >
                        All events
                    </button>
                    <button
                        className={`button anchor-button ${currentView === 'my' ? 'active' : ''}`}
                        onClick={(e) => this.props.setCurrentView('my')}
                    >
                        My events
                    </button>
                    <a href="/" className="link">
                        About
                    </a>
                </span>
            </header>
        );
    }
}

export default Header;
