import * as fp from "fingerpose";

const scissorsGesture = new fp.GestureDescription("scissors");

for (let finger of [fp.Finger.Thumb, fp.Finger.Ring, fp.Finger.Pinky]) {
  scissorsGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  scissorsGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl);
  scissorsGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl);
}

export default scissorsGesture;
