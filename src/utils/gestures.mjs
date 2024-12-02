import * as fp from "fingerpose";

export const paperGesture = new fp.GestureDescription("paper");

for (let finger of [
  fp.Finger.Thumb,
  fp.Finger.Index,
  fp.Finger.Middle,
  fp.Finger.Ring,
  fp.Finger.Pinky,
]) {
  paperGesture.addCurl(finger, fp.FingerCurl.NoCurl);
}

export const rockGesture = new fp.GestureDescription("rock");

for (let finger of [
  fp.Finger.Thumb,
  fp.Finger.Index,
  fp.Finger.Middle,
  fp.Finger.Ring,
  fp.Finger.Pinky,
]) {
  rockGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  rockGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
}

export const scissorsGesture = new fp.GestureDescription("scissors");

for (let finger of [fp.Finger.Thumb, fp.Finger.Ring, fp.Finger.Pinky]) {
  scissorsGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  scissorsGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl);
  scissorsGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl);
}
