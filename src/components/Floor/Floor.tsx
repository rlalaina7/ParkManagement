import React, {useState, useEffect} from 'react';
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
    const [isAddSpotFormVisible, setIsAddSpotFormVisible] = useState(false);

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
    
    const getNextSpotId = () => {
        if (spots.length === 0) {
            return `${floor.floorNumber}A`;
        }
        const lastSpot = spots[spots.length - 1];
        const lastId = lastSpot.id;
        const lastChar = lastId.slice(-1);
        const nextChar = String.fromCharCode(lastChar.charCodeAt(0) + 1);
        return `${floor.floorNumber}${nextChar}`;
    };

    const [newSpotId, setNewSpotId] = useState(getNextSpotId());
    const [newSpotType, setNewSpotType] = useState<string>('');

    useEffect(() => {
        setNewSpotId(getNextSpotId());
    }, [spots]);

    const handleAddSpot = () => {
        if (!newSpotType) return;
        const newSpot: Spot = {
            id: newSpotId,
            isAvailable: true,
            isFree: false,
            type: newSpotType
        };
        setSpots(prevSpots => [...prevSpots, newSpot]);
    };
    
    return (
        <div className='spot-display'>
            <header>
                <h2>Floor {floor.floorNumber}</h2>
            </header>
            <section className='spot-add--section'>
                <h3 className="toggle-add-spot--form" onClick={() => setIsAddSpotFormVisible(!isAddSpotFormVisible)}>
                    {isAddSpotFormVisible ? 'Cancel' : 'Add Spot'}
                </h3>
                {/* TODO: This component should be extracted from as a new component */}
                {isAddSpotFormVisible && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleAddSpot();
                            setIsAddSpotFormVisible(false);
                        }}
                        className='spot-add--form'
                    >
                        <label className='spot-add--id'>
                            Spot ID: {newSpotId}
                        </label>
                        <label className='spot-add--type' htmlFor='spotType'>
                            Type:
                            <select
                                id="spotType"
                                value={newSpotType}
                                onChange={e => setNewSpotType(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select type</option>
                                <option value="Compact">Compact</option>
                                <option value="Motorcycle">Motorcycle</option>
                                <option value="Handicapped">Handicapped</option>
                            </select>
                        </label>
                        <button className="btn btn-blue" type="submit">Add Spot</button>
                    </form>
                )}
            </section>
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