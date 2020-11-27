import React, { useState, useEffect } from 'react';
import './App.scss';

import FormControl from 'react-bootstrap/FormControl';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { SelectionMode } from './enums';
import { Character, SearchResponse } from './interfaces';
import { SearchResults, SpacecraftSummary } from './components';

function App() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<Character[]>([]);
    const [selectedCrew, setSelectedCrew] = useState<Character[]>([]);
    const [selectedPassengers, setSelectedPassengers] = useState<Character[]>([]);
    const [toggleValue, setToggleValue] = useState(SelectionMode.Crew);
    const [crewCapacity, setCrewCapacity] = useState<number>(0);
    const [passengersCapacity, setPassengersCapacity] = useState<number>(0);
    let timeout: ReturnType<typeof setTimeout>;

    const toggleOptions = [
        { name: 'Crew', value: SelectionMode.Crew },
        { name: 'Passenger', value: SelectionMode.Passenger },
    ];

    useEffect(() => {
        const starshipApiUrl = `https://swapi.dev/api/starships/10/`;

        fetch(starshipApiUrl)
            .then((res) => res.json())
            .then((response) => {
                setCrewCapacity(+response.crew);
                setPassengersCapacity(+response.passengers);
            });
    }, []);

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

    const addCrewMember = (character: Character) => {
        if (selectedCrew.length < crewCapacity) {
            setSelectedCrew([...selectedCrew, character]);
        }
    };

    const addPassenger = (character: Character) => {
        if (selectedPassengers.length < passengersCapacity) {
            setSelectedPassengers([...selectedPassengers, character]);
        }
    };

    const removePassenger = (character: Character) => {
        const newPassengers = selectedPassengers.filter((c) => c.name !== character.name);
        setSelectedPassengers(newPassengers);
    };

    const removeCrewMember = (character: Character) => {
        const newCrew = selectedCrew.filter((c) => c.name !== character.name);
        setSelectedCrew(newCrew);
    };

    const renderSearchResults = () => {
        return (
            <SearchResults
                isLoading={isLoading}
                searchResults={searchResults}
                selectedCrew={selectedCrew}
                selectedPassengers={selectedPassengers}
                onToggleSelection={(character) => {
                    const isSelectedCrew = selectedCrew.findIndex((p) => p.name === character.name) > -1;
                    const isSelectedPassenger = selectedPassengers.findIndex((p) => p.name === character.name) > -1;

                    if (isSelectedCrew) {
                        removeCrewMember(character);
                    } else if (isSelectedPassenger) {
                        removePassenger(character);
                    } else {
                        if (toggleValue === SelectionMode.Crew) {
                            addCrewMember(character);
                        } else {
                            addPassenger(character);
                        }
                    }
                }}
            />
        );
    };

    const renderToggleButton = () => {
        const options = toggleOptions.map((option, index) => {
            const isSelected = toggleValue === option.value;

            return (
                <ToggleButton
                    key={index}
                    type="radio"
                    variant={isSelected ? 'primary' : 'secondary'}
                    name="radio"
                    value={option.value}
                    checked={isSelected}
                    onChange={(e) => setToggleValue(e.currentTarget.value as SelectionMode)}
                >
                    {option.name}
                </ToggleButton>
            );
        });

        return <ButtonGroup toggle>{options}</ButtonGroup>;
    };

    return (
        <div className="container">
            <header className="page-header">
                <h2>Star Wars - Spacecraft Management</h2>
            </header>

            <div className="row">
                <div className="col-sm-12 col-lg-8 search-col">
                    <div className="mb-4">{renderToggleButton()}</div>

                    <div className="mb-4">
                        <FormControl
                            type="text"
                            placeholder="Enter a Star Wars character's name..."
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </div>

                    {renderSearchResults()}
                </div>

                <div className="col-sm-12 col-lg-4 spacecraft-col">
                    <SpacecraftSummary
                        maxCrew={crewCapacity}
                        maxPassengers={passengersCapacity}
                        selectedCrew={selectedCrew}
                        selectedPassengers={selectedPassengers}
                        onRemoveCrew={(character) => {
                            removeCrewMember(character);
                        }}
                        onRemovePassenger={(character) => {
                            removePassenger(character);
                        }}
                        onLaunch={() => {
                            console.log('%c[ App ] - Launch Spacecraft:', 'color: #FF4900');
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
