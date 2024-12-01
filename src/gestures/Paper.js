import * as fp from "fingerpose";

const paperGesture = new fp.GestureDescription("paper");

for (let finger of [
  fp.Finger.Thumb,
  fp.Finger.Index,
  fp.Finger.Middle,
  fp.Finger.Ring,
  fp.Finger.Pinky,
]) {
  paperGesture.addCurl(finger, fp.FingerCurl.NoCurl);
}

export default paperGesture;
