import React, { FC } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FieldsWrapper from '.';

describe('FieldsWrapper', () => {
  it('render FieldsWrapper', () => {
    const Input: FC = () => <input name="test" value="test" type="text" />;
    expect.assertions(2);

    const { container, getByDisplayValue } = render(
      <FieldsWrapper>
        <Input />
      </FieldsWrapper>,
    );

    expect(container).toBeTruthy();
    expect(getByDisplayValue('test')).toBeTruthy();
  });
});
