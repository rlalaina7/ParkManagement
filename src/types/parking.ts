
export interface ParkingGarage {
    entranceMessage: string;
    floors: Floor[];
}

export interface Floor {
    floorNumber: number;
    spots: Spot[];
    displayBoard: DisplayBoard;
}

export interface Spot {
    id: string;
    type: SpotTypeKey;
}

export interface DisplayBoard {
    message: string;
}

// Spot types
export type SpotTypeKey = "Compact" | "Large" | "Handicapped" | "Motorcycle";
