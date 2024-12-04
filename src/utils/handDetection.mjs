import * as fp from "fingerpose";
import { rockGesture, paperGesture, scissorsGesture } from "./gestures.mjs";
import * as handpose from "@tensorflow-models/handpose";

export const handDetection = async (
  net,
  webcamRef,
  canvasRef,
  setUserChoice,
  setEmoji
) => {
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

export const runHandpose = async (
  webcamRef,
  canvasRef,
  setUserChoice,
  setEmoji
) => {
  let isRunning = true;
  try {
    const net = await handpose.load(); // Load handpose model

    const detectLoop = async () => {
      if (!isRunning) return; //Exit loop when stopRunning is called.

      try {
        await handDetection(net, webcamRef, canvasRef, setUserChoice, setEmoji); // Perform gesture detection
      } catch (error) {
        console.error("Error during hand detection:", error); //error during hand detection
      }

      requestAnimationFrame(detectLoop); // Handpost detection running in line with system refresh
    };

    detectLoop(); // Start the loop

    setTimeout(() => {
      isRunning = false;
    }, 500);
  } catch (error) {
    console.error("error loading handpose model", error); // Error handling for handpost model not returning
  }
};
