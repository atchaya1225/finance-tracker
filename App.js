import React, { useState } from 'react';
import './App.css';
import AddTransaction from './AddTransaction';
import Report from './Report';

const App = () => {
    const [view, setView] = useState('addTransaction');

    return (
        <div className="container">
             {/* Header */}
             <header>
                <h1>📊 Personal Finance Tracker</h1>
            </header>
            {/* Navigation Menu */}
            <nav>
                <ul>
                    <li onClick={() => setView('addTransaction')}>➕ Add Transaction</li>
                    <li onClick={() => setView('report')}>📊 Report</li>
                    <li onClick={() => setView('aboutUs')}>ℹ️ About Us</li>
                </ul>
            </nav>

            {/* Main Content */}
            <main>
                {view === 'addTransaction' && <AddTransaction />}
                {view === 'report' && <Report />}
                {view === 'aboutUs' && <AboutUs />}
            </main>
            <footer>
                <p>© 2025 Personal Finance Tracker | Built with ❤️</p>
            </footer>
        </div>
    );
};

const AboutUs = () => (
    <div className="content-section">
        <h2>About Personal Finance Tracker</h2>
      <p>
        The Personal Finance Tracker is a simple and user-friendly app to help you manage your daily transactions.
        You can add income or expense entries, view your balance, and get insights into your spending habits.
      </p>
      <p>
        This project is built using React, with sqlite3 Database to save the data even after refreshing the page.
        The backend is powered by Node.js and Express, ensuring a smooth and efficient experience.
      </p>

    </div>
);

export default App;
