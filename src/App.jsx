import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router";
import GamePage from "./pages/GamePage/GamePage";
import HomePage from "./pages/HomePage/HomePage";
import HighscorePage from "./pages/HighscorePage/HighscorePage";
import { useState } from "react";
import AboutPage from "./pages/AboutPage/AboutPage";

function App() {
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
    setMessage("");
  };

  const handleUserNameSubmit = (event) => {
    if (!userName.trim()) {
      setMessage("Please include a username for the best experience");
    }
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                handleUserNameSubmit={handleUserNameSubmit}
                handleUserNameChange={handleUserNameChange}
                userName={userName}
                message={message}
              />
            }
          />
          <Route path="/game" element={<GamePage userName={userName} />} />
          <Route path="/highscore" element={<HighscorePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
