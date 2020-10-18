import React from 'react';
import { act } from '@testing-library/react';
import { fireEvent, render } from 'utils/testutils';
import EditItemBar from '../EditItemBar/EditItemBar';

describe('Edit item bar tests', () => {
  it('render component', async () => {
    const promise = Promise.resolve();
    const fakePolish = 'pies';
    const fakeEnglish = 'dog';

    const { getByText } = render(
      <EditItemBar
        id=""
        polish={fakePolish}
        english={fakeEnglish}
        description=""
        isVisible
        handleClose={jest.fn()}
      />,
    );
    await act(() => promise);
    expect(
      getByText(
        /The word can have a maximum of 25 letters and be without special characters. Description can have a maximum of 100 letters./i,
      ),
    ).toBeInTheDocument();
  });

  it('checking inputs values', async () => {
    const promise = Promise.resolve();
    const fakePolish = 'pies';
    const fakeEnglish = 'dog';

    const { getByLabelText } = render(
      <EditItemBar
        id=""
        polish={fakePolish}
        english={fakeEnglish}
        description=""
        isVisible
        handleClose={jest.fn()}
      />,
    );

    await act(() => promise);
    expect(getByLabelText('Polish*')).toHaveValue(fakePolish);
    expect(getByLabelText('English*')).toHaveValue(fakeEnglish);
  });

  it('changing input values and checking this', async () => {
    const promise = Promise.resolve();
    const fakeInitPolish = 'pies';
    const fakeInitEnglish = 'dog';
    const fakeNewPolish = 'kot';
    const fakeNewEnglish = 'cat';

    const { getByLabelText } = render(
      <EditItemBar
        id=""
        polish={fakeInitPolish}
        english={fakeInitEnglish}
        description=""
        isVisible
        handleClose={jest.fn()}
      />,
    );

    const polishInput = getByLabelText('Polish*');
    const englishInput = getByLabelText('English*');
    await fireEvent.change(polishInput, { target: { value: 'kot' } });
    await fireEvent.change(englishInput, { target: { value: 'cat' } });

    await act(() => promise);

    expect(getByLabelText('Polish*')).toHaveValue(fakeNewPolish);
    expect(getByLabelText('English*')).toHaveValue(fakeNewEnglish);
  });
});
