import React from 'react';

import Badge from 'react-bootstrap/Badge';

import { Character } from '../../interfaces';

import './CharacterCard.scss';

export interface CharacterCardProps {
    character: Character;
    isSelectedCrew: boolean;
    isSelectedPassenger: boolean;
    onToggleSelected: () => void;
}

export function CharacterCard(props: CharacterCardProps): any {
    const { character, isSelectedCrew, isSelectedPassenger, onToggleSelected } = props;

    const avatarId = character.url.split('/').slice(-2)[0];

    const cardClasses = [
        'character-card',
        isSelectedCrew && 'character-card--selected-crew',
        isSelectedPassenger && 'character-card--selected-passenger',
    ]
        .filter((c) => !!c)
        .join(' ');

    const renderBadge = () => {
        if (isSelectedCrew) {
            return (
                <Badge pill variant="warning">
                    Crew
                </Badge>
            );
        }

        if (isSelectedPassenger) {
            return (
                <Badge pill variant="info">
                    Passenger
                </Badge>
            );
        }

        return null;
    };

    return (
        <div className={cardClasses} onClick={onToggleSelected} role="button">
            <div
                className="character-card__avatar"
                style={{
                    backgroundImage: `url(images/${avatarId}.jpg`,
                }}
            ></div>

            <div className="character-card__content">
                <div className="character-card__name" title={character.name}>
                    {character.name}
                </div>
                <table className="character-card__attributes">
                    <tbody>
                        <tr>
                            <td>Birth Year:</td>
                            <td>{character.birth_year}</td>
                        </tr>
                        <tr>
                            <td>Gender:</td>
                            <td>{character.gender}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="character-card__badge">{renderBadge()}</div>
        </div>
    );
}
