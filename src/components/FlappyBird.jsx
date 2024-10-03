import { useEffect, useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import Bird from "./Bird";
import Constants from "../constants";
import Pipe from "./Pipes";

const FlappyBird = () => {
  const stageRef = useRef();
  const birdYRef = useRef(Constants.BIRD_START_Y);
  const pipeXRef = useRef(Constants.PIPE_START_X);

  const velocityRef = useRef(0);
  const pipeSpeedRef = useRef(Constants.PIPE_SPEED);

  const [birdY, setBirdY] = useState(birdYRef.current); // Actual state for React re-render
  const [pipeX, setPipeX] = useState(pipeXRef.current);
  const [topPipeHeight, setTopPipeHeight] = useState(
    Math.random() * (window.innerHeight / 2) // Random height for the top pipe
  );
  const pipeGap = Constants.PIPE_GAP; // Define a fixed gap between the top and bottom pipes

  const gameLoop = () => {
    // Update bird position and velocity based on gravity
    velocityRef.current += Constants.GRAVITY;
    birdYRef.current += velocityRef.current;
    pipeXRef.current -= pipeSpeedRef.current;

    // Prevent bird from going below the screen
    if (birdYRef.current > window.innerHeight - Constants.BIRD_RADIUS) {
      birdYRef.current = window.innerHeight - Constants.BIRD_RADIUS; // Keep the bird on screen
      velocityRef.current = 0; // Stop when hitting the ground
    }

    // Occasionally sync state with React for rendering
    setBirdY(birdYRef.current);
    setPipeX(pipeXRef.current);

    // Continue the game loop
    requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    const animationId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationId); // Cleanup on unmount
  }, []); // Only run once

  const handleKeyDown = (e) => {
    if (e.code === "Space") {
      console.log("Space key pressed", birdYRef.current);
      velocityRef.current = -Constants.JUMP_FORCE; // Apply lift to the bird (upward velocity)
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <Layer>
        <Bird birdY={birdY} className="bg-black" />
        {/* Pass both topPipeHeight and gap to Pipe */}
        <Pipe pipeX={pipeX} topPipeHeight={topPipeHeight} gap={pipeGap} />
      </Layer>
    </Stage>
  )
};

export default FlappyBird;
