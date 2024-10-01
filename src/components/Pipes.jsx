/* eslint-disable react/prop-types */
import { Rect } from 'react-konva'
import Constants from '../constants'

const Pipe = ({ pipeX }) => {
    return (

        <Rect
            x={pipeX}
            y={0}
            width={Constants.PIPE_WIDTH}
            height={300}
            fill={"#000000"}
        />

    )
}

export default Pipe
