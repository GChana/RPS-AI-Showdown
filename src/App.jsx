import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router";
import GamePage from "./pages/GamePage/GamePage";
import HomePage from "./pages/HomePage/HomePage";
import { useState } from "react";

function App() {
  const [userName, setUserName] = useState("");

  const handleUserNameSubmit = (event) => {
    event.preventDefault();
    setUserName(event.target.value);
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
                userName={userName}
              />
            }
          />
          <Route path="/game" element={<GamePage userName={userName} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
