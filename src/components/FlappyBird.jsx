import { useEffect, useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import Bird from "./Bird";
import Constants from "../constants";
import Pipe from "./Pipe";
import { getTopPipeHeight } from "../utils";

const FlappyBird = () => {
  const stageRef = useRef();
  const birdYRef = useRef(Constants.BIRD_START_Y);

  const velocityRef = useRef(0);
  const pipeSpeedRef = useRef(Constants.PIPE_SPEED);

  const [birdY, setBirdY] = useState(birdYRef.current); // Actual state for React re-render
  const pipeGap = Constants.PIPE_GAP; // Define a fixed gap between the top and bottom pipes

  const [pipes, setPipes] = useState([]) // Store all the pipes

  const [score, setScore] = useState(0);

  useEffect(() => {
    // Create a new pipe every 3 seconds
    console.log("Current pipes", pipes);
    console.log("Creating new pipe");

    const intervalId = setInterval(() => {
      const newTopPipeHeight = getTopPipeHeight();
      const newPipe = {
        x: Constants.PIPE_START_X,
        height: newTopPipeHeight
      };
      setPipes((pipes) => [...pipes, newPipe]);
      // update score logaritmically
      setScore((prevScore) => Math.floor(pipes ? prevScore + Math.log10(pipes.length) : 0));

    }, 2000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const gameLoop = () => {
    // Update bird position and velocity based on gravity
    velocityRef.current += Constants.GRAVITY;
    birdYRef.current += velocityRef.current;

    // Prevent bird from going below the screen
    if (birdYRef.current > window.innerHeight - Constants.BIRD_RADIUS) {
      birdYRef.current = window.innerHeight - Constants.BIRD_RADIUS; // Keep the bird on screen
      velocityRef.current = 0; // Stop when hitting the ground
    }

    // Prevent bird from going above the screen
    if (birdYRef.current < 0) {
      birdYRef.current = 0; // Keep the bird on screen
      velocityRef.current = 0; // Stop when hitting the ceiling
    }

    setPipes((prevPipes) =>
      prevPipes.map((pipe) => ({
        ...pipe,
        x: pipe.x - pipeSpeedRef.current,
      }))
    );
    setBirdY(birdYRef.current);

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
    // esc to end game
    if (e.code === "Escape") {
      console.log("Game Over");
      alert(`Game Over! Your score is ${score}`);
      setPipes([]);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="bg-green-300"
      >
        <Layer>
          <Bird birdY={birdY} className="" />
          {pipes && pipes.map((pipe, index) => (
            <Pipe key={index} pipeX={pipe.x} topPipeHeight={pipe.height} gap={pipeGap} />
          ))}
        </Layer>
      </Stage>
      <div className="absolute top-0 right-0 p-4 rounded-sm bg-gray-600">
        <p className="text-2xl text-gray-200">Score: {score}</p>
      </div>
    </>
  );
};

export default FlappyBird;
