import { blobSvgs } from "./blobSvgs";
import { hexToRgb } from "./colorConversion";

// textColor = Brightness(backgroundColor) < 130 ? 'light : 'black;
const checkBrightness = (rgb) => {
  const [r, g, b] = rgb;
  return Math.sqrt(r * r * 0.241 + g * g * 0.691 + b * b * 0.068);
};

export const getRandomColor = () => {
  const r = ("0" + Math.floor(Math.random() * 256).toString(16)).slice(-2);
  const g = ("0" + Math.floor(Math.random() * 256).toString(16)).slice(-2);
  const b = ("0" + Math.floor(Math.random() * 256).toString(16)).slice(-2);

  return "#" + r + g + b;
};

// format the text overlayed on the blobs by dividing
// it into 13 characters on each line
export const formatText = (text) => {
  const chars = text.split("");
  const charGroups = [];

  for (let i = 0; i < chars.length; i += 14) {
    const endIndex = Math.min(i + 14, chars.length);
    const chunk = chars.slice(i, endIndex);

    charGroups.push(chunk);
  }

  return charGroups;
};

export const generateBlobs = () => {
  const info = [
    `Streak 7 days`,
    `Favourite song - toxic by Britney Spears`,
    `Better sleep is known to ward off stress & anxiety`,
    `The last week you haven't been happy let's change that`,
  ];
  const blobs = [];

  for (let i = 0; i < 4; i++) {
    const randomBlobColour = getRandomColor();
    const randomBlobInt = Math.floor(Math.random() * blobSvgs.length);
    const randomBlob = blobSvgs[randomBlobInt];
    randomBlob.path.fill = randomBlobColour;

    // check the brightness of the random colour of the blob
    const rgbColour = hexToRgb(randomBlob.path.fill);
    const colourBrightness = checkBrightness(rgbColour);

    colourBrightness < 130
      ? (randomBlob.colour = "dark")
      : (randomBlob.colour = "light");

    randomBlob.text = info[i];
    blobs.push(randomBlob);
  }

  return blobs;
};
