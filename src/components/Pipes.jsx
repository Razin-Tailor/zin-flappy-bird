/* eslint-disable react/prop-types */
import { Rect } from 'react-konva'
import Constants from '../constants'

const Pipe = ({ pipeX, topPipeHeight, gap }) => {
    return (
        <>
            {/* Top pipe */}
            <Rect
                x={pipeX}
                y={0}
                width={Constants.PIPE_WIDTH}
                height={topPipeHeight}
                fill={"#000000"}
            />
            {/* Bottom pipe */}
            <Rect
                x={pipeX}
                y={topPipeHeight + gap}
                width={Constants.PIPE_WIDTH}
                height={window.innerHeight - topPipeHeight - gap}
                fill={"#000000"}
            />
        </>
    )
}

export default Pipe;
