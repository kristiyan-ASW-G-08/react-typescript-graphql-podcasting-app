import React, { FC } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormButton from '.';

describe('FormButton', () => {
  const text = 'text';
  it('render loading FormButton', () => {
    expect.assertions(3);

    const { container, getByTestId } = render(
      <FormButton text={text} loading={true} />,
    );

    expect(container).toBeTruthy();
    expect(getByTestId('loading')).toBeTruthy();
    expect(getByTestId('text')).toBeFalsy();
  });
  it('render loading FormButton', () => {
    expect.assertions(3);

    const { container, getByTestId } = render(
      <FormButton text={text} loading={false} />,
    );

    expect(container).toBeTruthy();
    expect(getByTestId('loading')).toBeFalsy();
    expect(getByTestId('text')).toBeTruthy();
  });
});
