import { useState, useRef, useEffect } from "react";
import "./GamePage.scss";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import Webcam from "react-webcam";
import rockImg from "../../assets/rock.png";
import paperImg from "../../assets/paper.png";
import scissorsImg from "../../assets/scissors.png";
import { machineResponse } from "../../utils/machineResponse.mjs";
import { determineWinner } from "../../utils/determineWinner.mjs";
import { runHandpose } from "../../utils/handDetection.mjs";
import theRockReady from "../../assets/TheRockReady.png";
import theRockMad from "../../assets/TheRockMad.png";
import theRockHappy from "../../assets/TheRockWin.png";
import React from "react";
import Player from "../../utils/player.mjs";
import Countdown from "../../components/Countdown/Countdown";

function GamePage() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [userChoice, setUserChoice] = useState("");
  const [machineChoice, setMachineChoice] = useState("");
  const [result, setResult] = useState("");
  const [emoji, setEmoji] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [playerOne, setPlayerOne] = useState(new Player("Gurpreet", 2));
  // const [papyrus, setPapyrus] = useState(new Player("Papyrus", 2));
  // const [edward, setEdward] = useState(new Player("Edward Scissorhands", 2));
  const [rocky, setRocky] = useState(new Player("The Rock", 2));
  // const [currentOpponent, setCurrentOpponent] = useState("placeholder", 2);
  const [winner, setWinner] = useState("");
  const [gameHistory, setGameHistory] = useState([]);
  const [startCountdown, setStartCountdown] = useState(false);
  // const [gameStarted, setGameStarted] = useState(false);

  const userName = localStorage.getItem("name");

  const images = {
    rock: rockImg,
    paper: paperImg,
    scissors: scissorsImg,
  };

  const opponents = [
    new Player("Papyrus", 2),
    new Player("Edward Scissorhands", 2),
    new Player("The Rock", 2),
  ];

  let opponent = opponents[2];

  const initialiseBackend = async () => {
    await tf.setBackend("webgl");
  };

  initialiseBackend();

  const handleMachineResponse = () => {
    const choice = machineResponse();
    setMachineChoice(choice);
    console.log(choice);
  };

  const handleDetermineWinner = () => {
    const { outcome, userScore: newScore } = determineWinner(
      userChoice,
      machineChoice,
      userScore,
      setRocky,
      setPlayerOne
    );
    if (outcome === "You win!") {
      rocky.health -= 1;
    }

    if (outcome === "Computer wins") {
      playerOne.health -= 1;
    }

    setGameHistory((prevHistory) => [
      ...prevHistory,
      { userChoice, machineChoice, outcome },
    ]);

    setUserScore(rocky.health === 0 ? newScore + 300 : newScore);
    setWinner(outcome);
  };

  const playGame = async () => {
    await runHandpose(webcamRef, canvasRef, setUserChoice, setEmoji);
    setResult("");
    setMachineChoice("");
    setUserChoice("");
    console.log("playgame actually starts at:", Date.now());
    setTimeout(() => {
      handleMachineResponse();
    }, 2000);
  };

  const handleStartButtonClick = () => {
    playGame();
    setStartCountdown(true);
  };

  const handleCountdownComplete = () => {
    console.log("playgame starts at:", Date.now());
    setStartCountdown(false);
  };

  // Only running on mount
  useEffect(() => {
    setTimeout(() => {
      if (userChoice && machineChoice) {
        handleDetermineWinner();
      }
    }, 1000);
  }, [userChoice, machineChoice]); // Run on mount AND when state variable X or Y changes

  // useEffect to set userScore to local storage for Highscore page
  useEffect(() => {
    localStorage.setItem("score", userScore);
  }, [userScore]);

  return (
    <>
      <div className="game">
        <div className="game__cams">
          <header className="user">
            <Webcam className="user__cam" ref={webcamRef} />
            <canvas className="user__cam" ref={canvasRef} />
            {emoji !== null && (
              <img className="user__emoji" src={images[emoji]} />
            )}
          </header>
          <div className="machine">
            <div className="machine__cam">
              <img
                className="machine__img"
                src={
                  playerOne.health <= 0
                    ? theRockHappy
                    : rocky.health <= 0
                    ? theRockMad
                    : theRockReady
                }
                alt="The Rock"
              />
            </div>
            {emoji !== null && (
              <img className="machine__emoji" src={images[machineChoice]} />
            )}
          </div>
        </div>
        <div className="history">
          <ul className="history__list">
            {gameHistory.map((game, index) => (
              <li className="history__item" key={index}>
                Round {index + 1}: {game.userChoice}{" "}
                {emoji !== null && (
                  <img
                    className="user__history-emoji"
                    src={images[game.userChoice]}
                  />
                )}{" "}
                vs {game.machineChoice}{" "}
                {emoji !== null && (
                  <img
                    className="user__history-emoji"
                    src={images[game.machineChoice]}
                  />
                )}{" "}
                - {game.outcome}
              </li>
            ))}
          </ul>
        </div>
        <div className="game__outcome">
          <p>You chose: {userChoice}</p>
          <p>
            {opponent.name} chose: {machineChoice}
          </p>
          <div className="result">{result && <p>{result}</p>}</div>
          <div className="score">
            <p className="score__user">
              {userName}'s Score: {userScore}
            </p>
            <p className="score__machine">
              {rocky.name} Health: {rocky.health}
            </p>
            <p className="score__machine">
              {userName}'s Health: {playerOne.health}
            </p>
            <div className="winner">{winner && <p>{winner}</p>}</div>
            {/* <button onClick={playGame} className="game__button">
              START
            </button> */}
            <div className="countdown">
              {!startCountdown && (
                <button onClick={handleStartButtonClick}>START GAME</button>
              )}
              {startCountdown && (
                <Countdown
                  startCountdown={startCountdown}
                  onCountdownComplete={handleCountdownComplete}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GamePage;
