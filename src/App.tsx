import React, { useState, useEffect } from 'react';
import './App.scss';

import FormControl from 'react-bootstrap/FormControl';

import { Character, SearchResponse } from './interfaces';
import { SearchResults } from './components';


function App() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<Character[]>([]);
    let timeout: ReturnType<typeof setTimeout>;

    useEffect(() => {
        if (!searchTerm) {
            setSearchResults([]);
            return;
        }

        setIsLoading(true);

        const searchApiUrl = `https://swapi.dev/api/people?search=${searchTerm}`;

        fetch(searchApiUrl)
            .then((res) => res.json())
            .then((response: SearchResponse) => {
                setIsLoading(false);
                setSearchResults(response.results);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, [searchTerm]);

    const onSearchChange = (newSearchTerm: string) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => setSearchTerm(newSearchTerm), 1000);
    };

    const renderSearchResults = () => {
        return (
            <SearchResults
                isLoading={isLoading}
                searchResults={searchResults}
            />
        );
    };

    return (
        <div className="container">
            <header className="page-header">
                <h2>Star Wars - Spacecraft Management</h2>
            </header>

            <div className="row">
                <div className="col-sm-12 col-lg-8 search-col">
                    <div className="mb-4">
                        <FormControl
                            type="text"
                            placeholder="Enter a Star Wars character's name..."
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </div>

                    {renderSearchResults()}
                </div>

                <div className="col-sm-12 col-lg-4 spacecraft-col">Spacecraft</div>
            </div>
        </div>
    );
}

export default App;
