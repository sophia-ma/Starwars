import React from 'react';

import Spinner from 'react-bootstrap/Spinner';

import { Character } from '../../interfaces';
import { CharacterCard } from '../../components';

import './SearchResults.scss';

export interface SearchResultsProps {
    isLoading: boolean;
    searchResults: Character[];
    selectedCrew: Character[];
    selectedPassengers: Character[];
    onToggleSelection: (character: Character) => void;
}

export function SearchResults(props: SearchResultsProps): any {
    const { isLoading, searchResults, selectedCrew, selectedPassengers, onToggleSelection } = props;

    const characterCards = searchResults.map((character, index) => {
        const isSelectedCrew = selectedCrew.findIndex((c) => c.name === character.name) > -1;
        const isSelectedPassenger = selectedPassengers.findIndex((c) => c.name === character.name) > -1;

        return (
            <div key={index} className="col-sm-12 col-md-6 col-lg-6 mb-4">
                <CharacterCard
                    character={character}
                    isSelectedCrew={isSelectedCrew}
                    isSelectedPassenger={isSelectedPassenger}
                    onToggleSelected={() => onToggleSelection(character)}
                />
            </div>
        );
    });

    if (isLoading) {
        return (
            <div className="search-results search-results--loading">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (characterCards.length === 0) {
        return <div className="search-results search-results--empty">No results</div>;
    }

    return (
        <div className="search-results">
            <div className="row">{characterCards}</div>
        </div>
    );
}
