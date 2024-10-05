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
  const animationRef = useRef(null); // Store the animation frame ID

  const [birdY, setBirdY] = useState(birdYRef.current); // Actual state for React re-render
  const pipeGap = Constants.PIPE_GAP; // Define a fixed gap between the top and bottom pipes

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false); // Track game over state

  const pipesRef = useRef([]); // Store the pipes in a ref to avoid re-renders

  useEffect(() => {
    // Create a new pipe every 2 seconds
    const intervalId = setInterval(() => {
      if (!gameOver) {
        const newTopPipeHeight = getTopPipeHeight();
        const newPipe = {
          x: Constants.PIPE_START_X,
          height: newTopPipeHeight,
          scored: false,
        };
        pipesRef.current = [...pipesRef.current, newPipe]; // Update the ref
      }
    }, Constants.PIPE_INTERVAL);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [gameOver]); // Depend on gameOver to stop spawning pipes

  const gameLoop = () => {
    if (!gameOver) {
      // Update bird position and velocity based on gravity
      velocityRef.current += Constants.GRAVITY;
      birdYRef.current += velocityRef.current;

      // Prevent bird from going below the screen
      if (birdYRef.current > window.innerHeight - Constants.BIRD_RADIUS) {
        birdYRef.current = window.innerHeight - Constants.BIRD_RADIUS; // Keep the bird on screen
        velocityRef.current = 0; // Stop when hitting the ground
        handleGameOver();
        return; // Stop game loop on ground hit
      }

      // Prevent bird from going above the screen
      if (birdYRef.current < 0) {
        birdYRef.current = 0; // Keep the bird on screen
        velocityRef.current = 0; // Stop when hitting the ceiling
      }

      // Check for collision
      if (checkCollision()) {
        handleGameOver();
        return; // Stop game loop on collision
      }

      // Remove pipes that are out of the screen
      pipesRef.current = pipesRef.current.filter((pipe) => pipe.x > -Constants.PIPE_WIDTH);

      // update pipeRef x positions

      pipesRef.current = pipesRef.current.map((pipe) => ({
        ...pipe,
        x: pipe.x - pipeSpeedRef.current,
      }));

      // Update the score when the bird passes a pipe
      pipesRef.current.forEach((pipe) => {
        if (pipe.x <= Constants.BIRD_START_X && !pipe.scored) {
          setScore((prevScore) => prevScore + 1);
          pipe.scored = true;
        }
      });
      setBirdY(birdYRef.current);

      // Continue the game loop
      animationRef.current = requestAnimationFrame(gameLoop);
    }
  };

  const handleGameOver = () => {
    alert(`Game Over! Your score is ${score}`);
    setGameOver(true);
    cancelAnimationFrame(animationRef.current); // Stop the game loop
  };

  const checkCollision = () => {
    console.log("Checking collision...");
    const pipesCurrent = pipesRef.current;
    console.log("Pipes ref", pipesCurrent);

    return pipesCurrent.some((pipe) => {
      // Calculate bird's bounding box (X and Y positions)
      const birdLeftEdge = Constants.BIRD_START_X;
      const birdRightEdge = Constants.BIRD_START_X + Constants.BIRD_RADIUS;
      const birdTopEdge = birdYRef.current;
      const birdBottomEdge = birdYRef.current + Constants.BIRD_RADIUS;

      // Calculate pipe's bounding box (X and Y positions)
      const pipeLeftEdge = pipe.x;
      const pipeRightEdge = pipe.x + Constants.PIPE_WIDTH;
      const topPipeBottomEdge = pipe.height; // Height of the top pipe
      const bottomPipeTopEdge = pipe.height + pipeGap; // Top edge of the bottom pipe

      // Check if the bird is within the pipe's X range (pipeLeftEdge to pipeRightEdge)
      const withinPipeXRange = birdRightEdge > pipeLeftEdge && birdLeftEdge < pipeRightEdge;
      // console.log("Bird X:", birdLeftEdge, "to", birdRightEdge, "Pipe X:", pipeLeftEdge, "to", pipeRightEdge, "Within X Range:", withinPipeXRange);

      if (!withinPipeXRange) {
        return false; // If bird is not in X range, skip Y checks
      }

      // Check for collisions with the top or bottom pipe in the Y range
      const hittingTopPipe = birdTopEdge < topPipeBottomEdge; // Bird hits the top pipe if it's above the bottom edge of the top pipe
      const hittingBottomPipe = birdBottomEdge > bottomPipeTopEdge; // Bird hits the bottom pipe if it's below the top edge of the bottom pipe

      // console.log("Bird Y:", birdTopEdge, "to", birdBottomEdge, "Top Pipe Bottom Edge:", topPipeBottomEdge, "Bottom Pipe Top Edge:", bottomPipeTopEdge);
      // console.log("Hitting Top Pipe:", hittingTopPipe, "Hitting Bottom Pipe:", hittingBottomPipe);

      // Return true if the bird hits either the top or bottom pipe
      return hittingTopPipe || hittingBottomPipe;
    });
  };




  useEffect(() => {
    animationRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationRef.current); // Cleanup on unmount
  }, [gameOver]); // Restart game loop only if the game is not over

  const handleKeyDown = (e) => {
    if (e.code === "Space" && !gameOver) {
      velocityRef.current = -Constants.JUMP_FORCE; // Apply lift to the bird (upward velocity)
    }
    if (e.code === "Escape") {
      handleGameOver(); // End game on ESC key
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameOver]);

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
          {pipesRef.current.map((pipe, index) => (
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
