import { useEffect, useState } from 'react';
import type { ParkingGarage } from '../../types/parking';
import parkingData from '../../data/parkingData.json';

import { getFloorMessages } from '../../utils/parkingUtils';
import { Link } from 'react-router-dom';

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
        <div className='parking-display'>
            <header>
                <h2 className='parking-display--total-spots'>
                    Total spots available for the whole parking
                </h2>
                <span><strong>{totalAvailableSpots}</strong> / {totalSpots} available</span>
            </header>
            <section className='parking-display--section'>
                <h3>Entrance display: {entranceMessage}</h3>
                <div className='parking-display--available-spots'>
                    {parkingFloors.map(({ floorNumber, spots }) => {
                        const available = spots.filter(spot => spot.isAvailable).length;
                        return (
                            <Link to={`/floor/${floorNumber}`} className='parking-display--card-link' key={floorNumber}>
                                <div className='parking-display--card'>
                                    <h3 className='parking-display--card-title'>
                                        Floor {floorNumber}:
                                    </h3>
                                    <span><strong>{available}</strong> / {spots.length} available</span>
                                    {floorMessages[floorNumber] && (
                                        <p className='parking-display--card-message'>
                                            <strong>{floorMessages[floorNumber]}</strong>
                                        </p>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <h3>Ground display: {groundMessage}</h3>
            </section>
        </div>
    );
};

export default ParkingDisplay;
