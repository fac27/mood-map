import { blobSvgs } from "./blobSvgs";
import { hexToRgb } from "./colorConversion";
import { IBlobSvg } from "@/types/types";
import { hexValue } from "@/types/types";

const checkBrightness = (rgb: number[]): number => {
  const [r, g, b] = rgb;
  return Math.sqrt(r * r * 0.241 + g * g * 0.691 + b * b * 0.068);
};

export const getRandomColor = (): hexValue => {
  const r = ("0" + Math.floor(Math.random() * 256).toString(16)).slice(-2);
  const g = ("0" + Math.floor(Math.random() * 256).toString(16)).slice(-2);
  const b = ("0" + Math.floor(Math.random() * 256).toString(16)).slice(-2);

  return `#${r + g + b}`;
};

export const formatText = (text: string): string[][] => {
  const chars = text?.split("");
  const charGroups: string[][] = [];

  for (let i = 0; i < chars?.length; i += 14) {
    const endIndex = Math.min(i + 14, chars.length);
    const chunk = chars?.slice(i, endIndex);

    charGroups.push(chunk);
  }

  return charGroups;
};

export const generateBlob = (): IBlobSvg => {
  const randomBlobColour = getRandomColor();
  const randomBlobInt = Math.floor(Math.random() * blobSvgs.length);
  const randomBlob = blobSvgs[randomBlobInt];
  randomBlob.path.fill = randomBlobColour;

  const rgbColour = hexToRgb(randomBlob.path.fill) as number[];
  const colourBrightness = checkBrightness(rgbColour);

  randomBlob.colour = colourBrightness < 135 ? "dark" : "light";

  return randomBlob;
};
