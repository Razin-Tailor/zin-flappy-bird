import React from 'react'
import { Rect } from 'react-konva'

const Pipes = ({ pipeDrift }) => {
    const width = 50
    return (
        <div>
            <Rect
                x={pipeDrift}
                y={0}
                width={width}
                height={300}
                fill={"#f5f5f5f5"}
            />
        </div>
    )
}

export default Pipes
