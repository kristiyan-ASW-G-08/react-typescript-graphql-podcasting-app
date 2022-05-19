import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import AudioPlayer from '.';

const play = jest.fn();
const pause = jest.fn();
const addEventListener = jest.fn();
const removeEventListener = jest.fn();
global.Audio = jest.fn().mockImplementation(() => ({
  pause,
  play,
  addEventListener,
  removeEventListener,
}));

describe('AudioPlayer', () => {
  it('render AudioPlayer', () => {
    const { getByTestId, getByText } = render(
      <AudioPlayer audioSrc={'/audio.svg'} />,
    );

    const playButton = getByTestId('playButton');
  });
});
