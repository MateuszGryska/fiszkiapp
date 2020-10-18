import { shuffle } from '../shuffle';

describe('test shuffle function', () => {
  it('checking return array', () => {
    const array = ['value one', 'value two', 'value three'];

    array.forEach((value) => {
      expect(typeof value).toBe('string');
    });

    expect(shuffle(array)).not.toContainEqual(['value one', 'value two', 'value three']);
  });
});
