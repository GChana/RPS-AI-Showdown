import { useState, useRef, useEffect } from "react";
import "./App.scss";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import * as fp from "fingerpose";
import rockGesture from "./gestures/Rock";
import paperGesture from "./gestures/Paper";
import scissorsGesture from "./gestures/Scissors";
import rock from "./assets/rock.png";
import paper from "./assets/paper.png";
import scissors from "./assets/scissors.png";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [userChoice, setUserChoice] = useState("");
  const [machineChoice, setMachineChoice] = useState("");
  const [result, setResult] = useState("");

  const [emoji, setEmoji] = useState(null);
  const images = {
    rock: rock,
    paper: paper,
    scissors: scissors,
  };

  const initialiseBackend = async () => {
    await tf.setBackend("webgl");
  };

  initialiseBackend();

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current != null &&
      webcamRef.current.video.readyState === 4
    ) {
      // video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      // set video width and height
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      // set canvas width and height
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      // make detection
      const hand = await net.estimateHands(video);

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          rockGesture,
          paperGesture,
          scissorsGesture,
        ]);
        const gesture = GE.estimate(hand[0].landmarks, 8);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const confidence = gesture.gestures.map(
            (prediction) => prediction.score
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
          const detectedGesture = gesture.gestures[maxConfidence].name;
          setEmoji(detectedGesture); // Update the UI
          setUserChoice(detectedGesture);
        }
      }
    }
  };

  let isRunning = false;

  const runHandpose = async () => {
    try {
      const net = await handpose.load(); // Load handpose model

      isRunning = true; // Enable the detection loop to start

      const detectLoop = async () => {
        if (!isRunning) return; //Exit loop when stopRunning is called.

        try {
          await detect(net); // Perform gesture detection
        } catch (error) {
          console.error("Error during hand detection:", error); //error during hand detection
        }

        requestAnimationFrame(detectLoop); // Handpost detection running in line with system refresh
      };

      detectLoop(); // Start the loop
    } catch (error) {
      console.error("error loading handpose model", error); // Error handling for handpost model not returning
    }
  };

  const stopHandpose = () => {
    isRunning = false;
  };

  // Gives machine response for rock || paper || scissors
  function machineResponse() {
    let choice = "";
    const randomNumber = Math.floor(Math.random() * 3);
    switch (randomNumber) {
      case 0:
        choice = "rock";
        break;
      case 1:
        choice = "paper";
        break;
      case 2:
        choice = "scissors";
        break;
    }
    setMachineChoice(choice); // Set the machine's choice
  }

  function determineWinner() {
    let outcome = "";
    if (userChoice === machineChoice) {
      outcome = "It's a tie game";
    } else if (userChoice === "rock" && machineChoice === "paper") {
      outcome = "Computer wins";
    } else if (userChoice === "paper" && machineChoice === "scissors") {
      outcome = "Computer wins";
    } else if (userChoice === "scissors" && machineChoice === "rock") {
      outcome = "Computer wins";
    } else {
      outcome = "You win!";
    }
    setResult(outcome);
  }

  const playGame = async () => {
    await runHandpose();
    machineResponse();
  };

  useEffect(() => {
    playGame();
  }, []);

  // Only running on mount
  useEffect(() => {
    // Logic: Run playGame only if X or Y is defined
    if (userChoice && machineChoice) {
      determineWinner();
    }
  }, [userChoice, machineChoice]); // Run on mount AND when state variable X or Y changes

  return (
    <>
      <div className="App">
        <header className="App-header">
          <Webcam
            ref={webcamRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 9,
              width: 640,
              height: 480,
            }}
          />
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 9,
              width: 640,
              height: 480,
            }}
          />

          {emoji !== null ? (
            <img
              src={images[emoji]}
              style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 520,
                bottom: 600,
                right: 0,
                textAlign: "center",
                height: 100,
              }}
            />
          ) : (
            ""
          )}
        </header>
        {emoji !== null ? (
          <img
            src={images[machineChoice]}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              height: 100,
            }}
          />
        ) : (
          ""
        )}
      </div>
      <div className="result">{result && <p>{result}</p>}</div>
    </>
  );
}

export default App;
