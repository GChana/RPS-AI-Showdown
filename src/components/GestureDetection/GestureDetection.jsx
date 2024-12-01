import { useState, useRef, useEffect } from "react";
import "@tensorflow/tfjs-backend-webgl";
import * as handpose from "@tensorflow-models/handpose";
import * as tf from "@tensorflow/tfjs";
import * as fp from "fingerpose";
import Webcam from "react-webcam";
import rockGesture from "../../gestures/Rock";
import paperGesture from "../../gestures/Paper";
import scissorsGesture from "../../gestures/Scissors";

const GestureDetector = ({ onGestureDetected }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);

  const initialiseBackend = async () => {
    await tf.setBackend("webgl");
  };

  useEffect(() => {
    initialiseBackend();
    runHandpose();

    return () => {
      setIsRunning(false); // Clean up on unmount
    };
  }, []);

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
        const gesture = await GE.estimate(hand[0].landmarks, 8);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const confidence = gesture.gestures.map(
            (prediction) => prediction.score
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
          const detectedGesture = gesture.gestures[maxConfidence].name;

          onGestureDetected(detectedGesture);
        }
      }
    }
  };

  const runHandpose = async () => {
    try {
      const net = await handpose.load(); // Load handpose model
      // console.log("Handpose model loaded");

      setIsRunning(true); // Enable the detection loop to start

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

  return (
    <>
      <Webcam ref={webcamRef} style={{ width: 640, height: 480 }} />
      <canvas ref={canvasRef} style={{ width: 640, height: 480 }} />
    </>
  );
};

export default GestureDetector;
