import type { ParkingGarage } from '../types/parking';
import parkingData from '../data/parkingData.json';
import { useEffect, useState } from 'react';

import SpotEdit from './Spot/SpotEdit';

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
    const [entranceMessage, setEntranceMessage] = useState(parkingGarage.message.entrance);
    const [groundMessage, setGroundMessage] = useState(parkingGarage.message.ground);
    
    // Calculate total spots and available spots
    const allSpots = parkingFloors.flatMap(floor => floor.spots);
    const totalSpots = allSpots.length;
    const totalAvailableSpots = allSpots.filter(spot => spot.isAvailable).length;

    // Update entrance and ground messages if no spots are available
    useEffect(() => {
        if (totalAvailableSpots === 0) {
            setEntranceMessage("Parking Full");
            setGroundMessage("Parking Full");
        }
    }, [totalAvailableSpots, parkingGarage.message.entrance, parkingGarage.message.ground]);

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
                <h3>Entrance display: {entranceMessage}</h3>
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
                <h3>Ground display: {groundMessage}</h3>
                {/* Display the edit spot for each floor here? */}
                {/* {parkingFloors.map(({ floorNumber, spots }) => (
                    <div key={`spots-floor-${floorNumber}`}>
                        <h4>Spots on Floor {floorNumber}:</h4>
                        {spots.map(spot => (
                            <SpotEdit
                                key={spot.id}
                                spotData={spot}
                            />
                        ))}
                    </div>
                ))} */}
            </section>
        </div>
    );
};

export default ParkingDisplay;
