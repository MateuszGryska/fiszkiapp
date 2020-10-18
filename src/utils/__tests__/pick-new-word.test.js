import { pickNewWord } from '../pick-new-word';

describe('test picking new word function', () => {
  it('checking return number', () => {
    // eslint-disable-next-line
    for (let length = 1; length < 100; length++) {
      const prevPosition = 1;
      if (length === 1) {
        expect(pickNewWord(length, prevPosition)).toBe(length);
      } else {
        expect(pickNewWord(length, prevPosition)).toBeLessThan(length);
        expect(pickNewWord(length, prevPosition)).not.toBe(prevPosition);
      }
    }
  });
});
