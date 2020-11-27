import React from 'react';

import Button from 'react-bootstrap/Button';

import { Character } from '../../interfaces';
import { CharacterCard } from '../../components';

import './SpacecraftSummary.scss';

export interface SpacecraftSummaryProps {
    maxCrew: number;
    maxPassengers: number;
    selectedCrew: Character[];
    selectedPassengers: Character[];
    onRemoveCrew: (passenger: Character) => void;
    onRemovePassenger: (passenger: Character) => void;
    onLaunch: () => void;
}

export function SpacecraftSummary(props: SpacecraftSummaryProps): any {
    const { selectedCrew, selectedPassengers, maxCrew, maxPassengers } = props;

    const renderCrewMembers = () => {
        if (selectedCrew.length === 0) {
            return <p>No crew members selected</p>;
        }

        return selectedCrew.map((passenger, index) => {
            return (
                <div className="mb-3" key={index}>
                    <CharacterCard
                        character={passenger}
                        isSelectedCrew={true}
                        isSelectedPassenger={false}
                        onToggleSelected={() => props.onRemoveCrew(passenger)}
                    />
                </div>
            );
        });
    };

    const renderPassengers = () => {
        if (selectedPassengers.length === 0) {
            return <p>No passengers selected</p>;
        }

        return selectedPassengers.map((passenger, index) => {
            return (
                <div className="mb-3" key={index}>
                    <CharacterCard
                        character={passenger}
                        isSelectedCrew={false}
                        isSelectedPassenger={true}
                        onToggleSelected={() => props.onRemovePassenger(passenger)}
                    />
                </div>
            );
        });
    };

    const isLaunchDisabled = selectedCrew.length !== maxCrew || selectedPassengers.length !== maxPassengers;

    return (
        <div className="spacecraft-summary">
            <div className="spacecraft-summary__header">
                <h4 className="text-center mb-3">Spacecraft</h4>
            </div>

            <div className="spacecraft-summary__lists">
                <h5 className="mt-4">
                    Crew Members ({selectedCrew.length} / {maxCrew})
                </h5>
                {renderCrewMembers()}

                <h5 className="mt-4">
                    Passengers ({selectedPassengers.length} / {maxPassengers})
                </h5>
                {renderPassengers()}
            </div>

            <div className="spacecraft-summary__actions">
                <Button className="mt-3" block disabled={isLaunchDisabled} onClick={props.onLaunch}>
                    Launch Spacecraft
                </Button>
            </div>
        </div>
    );
}
