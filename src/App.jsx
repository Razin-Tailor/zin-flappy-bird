import { useState } from "react";
import "./App.css";
import FlappyBird from "./components/FlappyBird";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <FlappyBird />
    </>
  );
}

export default App;
