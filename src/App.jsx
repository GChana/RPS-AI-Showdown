import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router";
import GamePage from "./pages/GamePage/GamePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
