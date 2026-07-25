

import React from 'react'

const CameraOnOffBtn = ({toggleCamera}) => {
    return (
        <button
            onClick={() => toggleCamera(prev => !prev)}
            className="rounded-xl bg-[var(--primary)] px-6 py-3 font-semibold"
        >
            {cameraOn ? "Turn Off Camera" : "Enable Camera"}
        </button>
    )
}

export default CameraOnOffBtn
