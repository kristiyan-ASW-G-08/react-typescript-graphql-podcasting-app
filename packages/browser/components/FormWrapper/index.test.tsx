import React, { FC } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormWrapper from '.';

describe('FormWrapper', () => {
  it('render FormWrapper', () => {
    const Input: FC = () => <input name="test" value="test" type="text" />;
    expect.assertions(2);

    const { container, getByDisplayValue } = render(
      <FormWrapper>
        <Input />
      </FormWrapper>,
    );

    expect(container).toBeTruthy();
    expect(getByDisplayValue('test')).toBeTruthy();
  });
});
