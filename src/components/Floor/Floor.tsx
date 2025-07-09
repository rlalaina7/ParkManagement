import React, {useState} from 'react';
import parkingData from '../../data/parkingData.json';
import type { Spot } from '../../types/parking';
import { useParams } from 'react-router';

/**
 * Component to edit the details of a specific floor in the parking garage.
 * Displays the spots on the floor and allows toggling availability and free parking status.
 * @returns {React.JSX.Element} The rendered component.
 */

const FloorEdit = (): React.JSX.Element => {
    const { floorId } = useParams();
    const parkingInfo = parkingData.parkingGarage;
    const floor = parkingInfo.floors.find((f: any) => f.floorNumber === Number(floorId));

    if (!floor) {
        return <div>Floor not found.</div>;
    }
    const [spots, setSpots] = useState(floor.spots);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        spot: Spot,
        field: keyof Spot
    ) => {
        setSpots(prevSpots =>
            prevSpots.map(s =>
                s.id === spot.id
                    ? { ...s, [field]: e.target.checked}
                    : s
            )
        );
    };
    
    return (
        <div className='spot-display'>
            <header>
                <h2>Floor {floor.floorNumber}</h2>
            </header>   
            <section className='spot-display--section'>
                <ul>
                    {spots.map((spot) => (
                        <li key={spot.id} className='spot-display--card'>
                            <h3>Spot {spot.id} - {spot.isAvailable ? '🟢 Available' : '🔴 Occupied'}</h3>
                            <form className="spot-details-form">
                                <label>
                                    Available:
                                    <input
                                        type="checkbox"
                                        checked={spot.isAvailable}
                                        onChange={(e) => {
                                            handleChange(e, spot, 'isAvailable');
                                        }}
                                    />
                                </label>
                                <label>
                                    Free parking:
                                    <input
                                        type="checkbox"
                                        checked={spot.isFree}
                                        onChange={(e) => {
                                            handleChange(e, spot, 'isFree');
                                        }}
                                    />
                                </label>
                                <label>
                                    Type:
                                    <input type="text" value={spot.type || ''} readOnly />
                                </label>
                            </form>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default FloorEdit;