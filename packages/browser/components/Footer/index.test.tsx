import React, { FC } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from '.';
describe('Footer', () => {
  it('render Footer', () => {
    expect.assertions(2);

    const { container } = render(<Footer />);

    expect(container).toBeTruthy;
    expect(container).toMatchSnapshot();
  });
});
