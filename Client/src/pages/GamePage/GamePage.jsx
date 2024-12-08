import { useState, useRef, useEffect } from "react";
import "./GamePage.scss";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import rockImg from "../../assets/rock.png";
import paperImg from "../../assets/paper.png";
import scissorsImg from "../../assets/scissors.png";
import { machineResponse } from "../../utils/machineResponse.mjs";
import { determineWinner } from "../../utils/determineWinner.mjs";
import { runHandpose } from "../../utils/handDetection.mjs";
import React from "react";
import Player from "../../utils/player.mjs";
import Countdown from "../../components/Countdown/Countdown";
import papyrusReady from "../../assets/PapyrusReady.png";
import edwardReady from "../../assets/EdwardReady.png";
import theRockReady from "../../assets/TheRockReady.png";
import axios from "axios";
import LoadNextLevel from "../../components/LoadNextLevel/LoadNextLevel";
import DefeatScreen from "../../components/DefeatScreen/DefeatScreen";
import { PlayerCam, OpponentCam } from "../../components/Cams/Cams";
import History from "../../components/History/History";
import {
  PlayerHealthBar,
  OpponentHealthBar,
} from "../../components/HealthBar/HealthBar.jsx";
import NavBar from "../../components/NavBar/NavBar";

const opponents = [
  new Player("Papyrus", 1),
  new Player("Edward Scissorhands", 1),
  new Player("The Rock", 1),
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
  const [playerOne, setPlayerOne] = useState(new Player("", 2));
  const [winner, setWinner] = useState("");
  const [gameHistory, setGameHistory] = useState([]);
  const [startCountdown, setStartCountdown] = useState(false);
  const [currentOpponent, setCurrentOpponent] = useState(opponents[0]);
  const [level, setLevel] = useState(0);
  const [loadNextLevel, setloadNextLevel] = useState(false);
  const [defeatScreen, setDefeatScreen] = useState(false);
  const [response, setResponse] = useState("");

  const userName = localStorage.getItem("name");

  const characterRevenge = async () => {
    setResponse("");

    const currentOpponentFormatted = encodeURIComponent(
      currentOpponent.name.toLowerCase().replace(" ", "-")
    );
    const response = await axios.get(
      `http://localhost:5050/revenge/${currentOpponentFormatted}?userName=${encodeURIComponent(
        userName
      )}`
    );
    setResponse(response.data.response);
  };

  const characterTaunt = async () => {
    setResponse("");

    const currentOpponentFormatted = encodeURIComponent(
      currentOpponent.name.toLowerCase().replace(" ", "-")
    );
    const response = await axios.get(
      `http://localhost:5050/taunt/${currentOpponentFormatted}?userName=${encodeURIComponent(
        userName
      )}`
    );
    setResponse(response.data.response);
  };

  useEffect(() => {
    if (currentOpponent.health === 0) {
      console.log(currentOpponent.health);
      setPlayerOne((prevPlayerOne) => ({
        ...prevPlayerOne,
        health: 2,
      }));
      setEmoji(null);

      if (level === 3) {
        alert("YOU WON!");
      } else {
        characterRevenge();
        setloadNextLevel(true);
      }
    }
  }, [currentOpponent]);

  useEffect(() => {
    if (playerOne.health === 0) {
      characterTaunt();
      setDefeatScreen(true);
    }
  }, [playerOne.health]);

  const images = {
    rock: rockImg,
    paper: paperImg,
    scissors: scissorsImg,
  };

  const initialiseBackend = async () => {
    await tf.setBackend("webgl");
  };

  initialiseBackend();

  const handleMachineResponse = () => {
    const choice = machineResponse();
    setMachineChoice("scissors");
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
    }

    if (outcome === "Computer wins") {
      playerOne.health -= 1;
    }

    setGameHistory((prevHistory) => [
      ...prevHistory,
      { userChoice, machineChoice, outcome },
    ]);

    if (currentOpponent.health === 0) {
      console.log(currentOpponent.health);
      setUserScore((prevScore) => prevScore + 300);
    }
    setWinner(outcome);
  };

  const playGame = async () => {
    await runHandpose(webcamRef, canvasRef, setUserChoice, setEmoji);
    setResult("");
    setMachineChoice("");
    setUserChoice("");
    setTimeout(() => {
      handleMachineResponse();
    }, 1000);
  };

  const handleStartButtonClick = () => {
    playGame();
    setStartCountdown(true);
  };

  const handleCountdownComplete = () => {
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
        setUserChoice={setUserChoice}
        setMachineChoice={setMachineChoice}
        response={response}
        currentOpponent={currentOpponent}
        goToNextLevel={goToNextLevel}
      />
    );
  }

  if (defeatScreen) {
    return (
      <DefeatScreen
        setUserChoice={setUserChoice}
        setMachineChoice={setMachineChoice}
        response={response}
        currentOpponent={currentOpponent}
      />
    );
  }

  return (
    <>
      <div className="game">
        <header>
          <h1 className="header__title">
            {userName} VS {currentOpponent.name}
          </h1>
        </header>
        <NavBar />

        <div className="game__cards">
          <div className="game__cards-player">
            <PlayerHealthBar userName={userName} playerOne={playerOne} />
            <PlayerCam
              webcamRef={webcamRef}
              canvasRef={canvasRef}
              images={images}
              emoji={emoji}
            />
          </div>

          <div className="game__cards-divider">
            <p className="game__cards-divider-text">VS</p>
          </div>

          <div className="game__cards-opponent">
            <OpponentHealthBar currentOpponent={currentOpponent} />
            <OpponentCam
              images={images}
              emoji={emoji}
              currentOpponent={currentOpponent}
              papyrusReady={papyrusReady}
              edwardReady={edwardReady}
              theRockReady={theRockReady}
              machineChoice={machineChoice}
            />
          </div>
        </div>

        <div className="game__details">
          <History gameHistory={gameHistory} images={images} emoji={emoji} />
          <div className="game__outcome">
            <h3 className="game__outcome-details">
              {userName}'s Score: {userScore}
            </h3>
            <div className="game__outcome-details">
              {winner && <p>{winner}</p>}
            </div>
            <div className="game__outcome-details">
              {!startCountdown && (
                <button
                  className="game__outcome-button"
                  onClick={handleStartButtonClick}
                >
                  START GAME
                </button>
              )}
              {startCountdown && (
                <Countdown
                  startCountdown={startCountdown}
                  onCountdownComplete={handleCountdownComplete}
                />
              )}
            </div>
          </div>
          <div className="character__sheet">
            <h3 className="character__sheet-text">Placeholder text</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default GamePage;
