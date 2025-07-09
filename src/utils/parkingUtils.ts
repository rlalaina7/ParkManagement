import type { ParkingGarage } from '../types/parking';
import parkingData from '../data/parkingData.json';
const parkingGarage = parkingData.parkingGarage as ParkingGarage;
const parkingFloors = parkingGarage.floors;

export const getFloorMessages = (floors: typeof parkingFloors) =>
    floors.reduce<Record<number, string>>((acc, floor) => {
        const availableSpotsByFloor = floor.spots.filter(spot => spot.isAvailable).length;
        if (availableSpotsByFloor === 0) {
            acc[floor.floorNumber] = "No spots available";
        } else {
            acc[floor.floorNumber] = floor.displayBoard?.message || '';
        }
        return acc;
}, {});
