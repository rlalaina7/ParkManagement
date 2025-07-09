import React, { useState } from "react";
import type { Spot } from "../../types/parking";

interface SpotEditProps {
    spotData: Spot;
}


const SpotEdit = (props: SpotEditProps): React.JSX.Element => {
    const [spot, setSpot] = useState(props.spotData);

    return (
        <div>
            <p>Spot ID: {spot.id}</p>
            <p>Type: {spot.type}</p>
        </div>
    );
}

export default SpotEdit;