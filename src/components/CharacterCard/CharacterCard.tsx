import React from 'react';

import { Character } from '../../interfaces';

import './CharacterCard.scss';

export interface CharacterCardProps {
    character: Character;
}

export function CharacterCard(props: CharacterCardProps): any {
    const { character } = props;

    const avatarId = character.url.split('/').slice(-2)[0];

    return (
        <div className="character-card" role="button">
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
        </div>
    );
}
