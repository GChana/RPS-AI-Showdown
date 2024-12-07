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
import papyrusReady from "../../assets/PapyrusReady.png";
import papyrusHappy from "../../assets/PapyrusHappy.png";
import papyrusMad from "../../assets/PapyrusMad.png";
import edwardReady from "../../assets/EdwardReady.png";
import edwardHappy from "../../assets/EdwardHappy.png";
import edwardMad from "../../assets/EdwardSad.png";
import axios from "axios";
import LoadNextLevel from "../../components/LoadNextLevel/LoadNextLevel";

const opponents = [
  new Player("Papyrus", 1),
  new Player("Edward Scissorhands", 1),
  new Player("The Rock", 2),
];

const API = import.meta.env.VITE_API;

function GamePage() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [userChoice, setUserChoice] = useState("");
  const [machineChoice, setMachineChoice] = useState("");
  const [result, setResult] = useState("");
  const [emoji, setEmoji] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [playerOne, setPlayerOne] = useState(new Player("Gurpreet", 2));
  const [winner, setWinner] = useState("");
  const [gameHistory, setGameHistory] = useState([]);
  const [startCountdown, setStartCountdown] = useState(false);
  const [currentOpponent, setCurrentOpponent] = useState(opponents[0]);
  const [currentOpponentIndex, setCurrentOpponentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [level, setLevel] = useState(0);

  const [loadNextLevel, setloadNextLevel] = useState(false);

  const [response, setResponse] = useState("");

  const userName = localStorage.getItem("name");
  console.log(currentOpponent);

  // this useEffect will trigger whenever there's a change loadNextLevel
  // flips it after 2 seconds
  // useEffect(() => {
  //   if (loadNextLevel) {
  //     setTimeout(() => {
  //       setloadNextLevel(false);
  //       setCurrentOpponent(opponents[level + 1]);
  //       setLevel(level + 1);
  //     }, 10000);
  //   }
  // }, [loadNextLevel]);

  const characterTaunt = async () => {
    setResponse("");

    const currentOpponentFormatted = encodeURIComponent(
      currentOpponent.name.toLowerCase().replace(" ", "-")
    );
    console.log(currentOpponentFormatted);
    const response = await axios.get(
      `${API}/characters/${currentOpponentFormatted}`
    );
    setResponse(response.data.response);
  };
  // this useEffect triggeres
  // whenever there's a change in opponent
  useEffect(() => {
    // win level condition
    if (currentOpponent.health === 0) {
      console.log(currentOpponent.health);
      setPlayerOne.health = 2;
      // setCurrentOpponent.health = 2;
      setEmoji(null);

      if (level === 3) {
        alert("YOU WON!");
        // navigate to winning page
      } else {
        // API CALLS WILL HAPPEN HERE!
        characterTaunt();
        // if (currentOpponent.name === "Papyrus") {
        //   characterTaunt("papyrus");
        // }
        // if (currentOpponent.name === "Edward Scissorhands") {
        //   characterTaunt("edwardscissorhands");
        // }
        // if (currentOpponent.name === "The Rock") {
        //   characterTaunt("therock");
        // }
        setloadNextLevel(true);
      }
    }
  }, [currentOpponent]);

  const images = {
    rock: rockImg,
    paper: paperImg,
    scissors: scissorsImg,
  };

  let opponent = opponents[0];
  console.log(opponent.health);

  const initialiseBackend = async () => {
    await tf.setBackend("webgl");
  };

  initialiseBackend();

  const handleMachineResponse = () => {
    const choice = machineResponse();
    setMachineChoice("scissors");
    console.log(choice);
  };

  const handleDetermineWinner = () => {
    const { outcome } = determineWinner(
      userChoice,
      machineChoice,
      setUserScore,
      setPlayerOne
    );

    if (outcome === "You win!") {
      setCurrentOpponent({
        ...currentOpponent,
        health: currentOpponent.health - 1,
      });
      console.log(opponent.health);
    }

    if (outcome === "Computer wins") {
      playerOne.health -= 1;
    }

    setGameHistory((prevHistory) => [
      ...prevHistory,
      { userChoice, machineChoice, outcome },
    ]);

    if (currentOpponent.health === 0) {
      setUserScore((prevScore) => prevScore + 300);
    }

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
    }, 1000);
  };

  const handleStartButtonClick = () => {
    playGame();
    setStartCountdown(true);
  };

  const handleCountdownComplete = () => {
    console.log("playgame starts at:", Date.now());
    setStartCountdown(false);
  };

  const goToNextLevel = () => {
    setloadNextLevel(false);
    setCurrentOpponent(opponents[level + 1]);
    setLevel(level + 1);
  };

  // Only running on mount
  useEffect(() => {
    setTimeout(() => {
      if (userChoice && machineChoice) {
        handleDetermineWinner();
      }
    }, 500);
  }, [userChoice, machineChoice]); // Run on mount AND when state variable X or Y changes

  // useEffect to set userScore to local storage for Highscore page
  useEffect(() => {
    localStorage.setItem("score", userScore);
  }, [userScore]);

  if (loadNextLevel) {
    return (
      <LoadNextLevel
        response={response}
        currentOpponent={currentOpponent}
        papyrusMad={papyrusMad}
        edwardMad={edwardMad}
        theRockMad={theRockMad}
        goToNextLevel={goToNextLevel}
      />
    );
  }

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
              {currentOpponent.name === "Papyrus" ? (
                <img
                  className="machine__img"
                  src={
                    playerOne.health <= 0
                      ? papyrusHappy
                      : opponent.health <= 0
                      ? papyrusMad
                      : papyrusReady
                  }
                  alt="Image of Papyrus"
                />
              ) : currentOpponent.name === "Edward Scissorhands" ? (
                <img
                  className="machine__img"
                  src={
                    playerOne.health <= 0
                      ? edwardHappy
                      : opponent.health <= 0
                      ? edwardMad
                      : edwardReady
                  }
                  alt="Image of Edward Scissorhands"
                />
              ) : (
                <img
                  className="machine__img"
                  src={
                    playerOne.health <= 0
                      ? theRockHappy
                      : opponent.health <= 0
                      ? theRockMad
                      : theRockReady
                  }
                  alt="Image of The Rock"
                />
              )}
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
          <h2>Current level: {level}</h2>
          <p>You chose: {userChoice}</p>
          <p>
            {currentOpponent.name} chose: {machineChoice}
          </p>
          <div className="result">{result && <p>{result}</p>}</div>
          <div className="score">
            <p className="score__user">
              {userName}'s Score: {userScore}
            </p>
            <p className="score__machine">
              {currentOpponent.name} Health: {currentOpponent.health}
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
