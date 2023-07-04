// textColor = Brightness(backgroundColor) < 130 ? 'light : 'black;

export const checkBrightness = (rgb) => {
  const [r, g, b] = rgb;
  return Math.sqrt(r * r * 0.241 + g * g * 0.691 + b * b * 0.068);
};
