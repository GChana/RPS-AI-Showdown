import "./Cams.scss";
import Webcam from "react-webcam";

export function PlayerCam({ webcamRef, canvasRef, images, emoji }) {
  return (
    <>
      <div className="cam">
        <Webcam className="cam__user" ref={webcamRef} />
        <canvas className="cam__user cam__user-canvas" ref={canvasRef} />
        {emoji !== null && <img className="cam__emoji" src={images[emoji]} />}
      </div>
    </>
  );
}

export function OpponentCam({
  images,
  emoji,
  currentOpponent,
  papyrusReady,
  edwardReady,
  theRockReady,
  machineChoice,
}) {
  return (
    <div className="cam">
      <div className="cam__machine">
        {currentOpponent.name === "Papyrus" ? (
          <img className="cam__img" src={papyrusReady} alt="Image of Papyrus" />
        ) : currentOpponent.name === "Edward Scissorhands" ? (
          <img
            className="cam__img"
            src={edwardReady}
            alt="Image of Edward Scissorhands"
          />
        ) : (
          <img
            className="cam__img"
            src={theRockReady}
            alt="Image of The Rock"
          />
        )}
      </div>
      {emoji !== null && (
        <img className="cam__emoji" src={images[machineChoice]} />
      )}
    </div>
  );
}
