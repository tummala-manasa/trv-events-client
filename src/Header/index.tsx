import React from 'react';

import './index.css';

type HeaderProps = {
    currentView: string;
    setCurrentView: (v: string) => void;
};

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
    return (
        <header className="header">
            TRIVAGO
            <span className="place">
                <button
                    className={`button anchor-button ${currentView === 'all' ? 'active' : ''}`}
                    onClick={(e) => setCurrentView('all')}
                >
                    All events
                </button>
                <button
                    className={`button anchor-button ${currentView === 'my' ? 'active' : ''}`}
                    onClick={(e) => setCurrentView('my')}
                >
                    My events
                </button>
                <a href="/" className="link">
                    About
                </a>
            </span>
        </header>
    );
};

export default Header;
