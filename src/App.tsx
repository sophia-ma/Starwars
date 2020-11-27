import React from 'react';
import './App.scss';

function App() {
    return (
        <div className="container">
            <header className="page-header">
                <h2>Star Wars - Spacecraft Management</h2>
            </header>

            <div className="row">
                <div className="col-sm-12 col-lg-8 search-col">
                    Search Results
                </div>

                <div className="col-sm-12 col-lg-4 spacecraft-col">
                    Spacecraft
                </div>
            </div>
        </div>
    );
}

export default App;