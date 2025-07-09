import type { ParkingGarage } from '../types/parking';
import parkingData from '../data/parkingData.json';
import { useEffect, useState } from 'react';

/**
 * Displays the parking availability summary and per-floor breakdown.
 * @component
 * @description This component calculates and displays the total number of parking spots,
 * the number of available spots, and the available spots per floor.
 * @returns A React element displaying total and per-floor parking spot availability.
 */
const ParkingDisplay = () => {
    const parkingGarage = parkingData.parkingGarage as ParkingGarage;
    const parkingFloors = parkingGarage.floors;

    // Generate floor messages
    const getFloorMessages = (floors: typeof parkingFloors) =>
        floors.reduce<Record<number, string>>((acc, floor) => {
            const availableSpotsByFloor = floor.spots.filter(spot => spot.isAvailable).length;
            if (availableSpotsByFloor === 0) {
                acc[floor.floorNumber] = "No spots available";
            } else {
                acc[floor.floorNumber] = floor.displayBoard?.message || '';
            }
            return acc;
        }, {});

    const [floorMessages, setFloorMessages] = useState(() => getFloorMessages(parkingFloors));

    // Calculate total spots and available spots
    const allSpots = parkingFloors.flatMap(floor => floor.spots);
    const totalSpots = allSpots.length;
    const totalAvailableSpots = allSpots.filter(spot => spot.isAvailable).length;

    useEffect(() => {
        setFloorMessages(getFloorMessages(parkingFloors));
    }, [parkingFloors]);

    return (
        <div>
            <header>
                <h2>
                    Total spots available for the whole parking
                </h2>
                <span><strong>{totalAvailableSpots}</strong> / {totalSpots} available</span>
            </header>
            <section>
                {parkingFloors.map(({ floorNumber, spots }) => {
                    const available = spots.filter(spot => spot.isAvailable).length;
                    return (
                        <div key={floorNumber}>
                            <h3>
                                Floor {floorNumber}:
                            </h3>
                            <span><strong>{available}</strong> / {spots.length} available</span>
                            {floorMessages[floorNumber] && (
                                <p><strong>{floorMessages[floorNumber]}</strong></p>
                            )}
                        </div>
                    );
                })}
            </section>
        </div>
    );
};

export default ParkingDisplay;
