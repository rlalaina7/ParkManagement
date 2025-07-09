
export interface ParkingGarage {
    message: {
        entrance: string;
        ground: string;
    };
    floors: Floor[];
}

export interface Floor {
    floorNumber: number;
    spots: Spot[];
    displayBoard: DisplayBoard;
}

export interface Spot {
    id: string;
    type: string;
    isAvailable: boolean;
    isFree: boolean;
}

export interface DisplayBoard {
    message: string;
}
