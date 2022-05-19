import React, { FC } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Notification from '.';

describe('Notification', () => {
  it('render Notification', () => {
    expect.assertions(2);
    const content = 'content';
    const { container, getByText } = render(
      <Notification type="message" content={content} />,
    );

    expect(container).toBeTruthy;
    expect(getByText(content)).toBeInTheDocument();
  });
});
