export const pickNewWord = (length: number, prevPosition: number) => {
  let random;
  if (length === 1) {
    random = prevPosition;
    return random;
  }
  do {
    random = Math.floor(Math.random() * length);
  } while (random === prevPosition);

  return random;
};
