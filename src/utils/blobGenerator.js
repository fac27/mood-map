export const getRandomColor = () => {
  const r = ("0" + Math.floor(Math.random() * 256).toString(16)).slice(-2);
  const g = ("0" + Math.floor(Math.random() * 256).toString(16)).slice(-2);
  const b = ("0" + Math.floor(Math.random() * 256).toString(16)).slice(-2);

  return "#" + r + g + b;
};

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateShapeProps = () => {
  return {
    size: 150,
    growth: getRandomInt(2, 9),
    edges: getRandomInt(3, 20),
  };
};

export const blobs = [
  {
    id: 1,
    variant: "solid",
    color: getRandomColor(),
    shapeProps: generateShapeProps(),
    text: `Streak 7 days`,
  },
  {
    id: 2,
    variant: "gradient",
    color: [getRandomColor(), getRandomColor()],
    shapeProps: generateShapeProps(),
    text: `Favourite song - toxic by Britney Spears`,
  },
  {
    id: 3,
    variant: "solid",
    color: getRandomColor(),
    shapeProps: generateShapeProps(),
    text: `Better sleep is known to ward off stress & anxiety`,
  },
  {
    id: 4,
    variant: "gradient",
    color: [getRandomColor(), getRandomColor()],
    shapeProps: generateShapeProps(),
    text: `The last week you haven't been happy let's change that`,
  },
];
