import React from 'react';

import Spinner from 'react-bootstrap/Spinner';

import { Character } from '../../interfaces';
import { CharacterCard } from '../../components';

import './SearchResults.scss';

export interface SearchResultsProps {
    isLoading: boolean;
    searchResults: Character[];
}

export function SearchResults(props: SearchResultsProps): any {
    const { isLoading, searchResults } = props;

    const characterCards = searchResults.map((character, index) => {
        return (
            <div key={index} className="col-sm-12 col-md-6 col-lg-6 mb-4">
                <CharacterCard character={character} />
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
