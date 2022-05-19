import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import getFile from 'utilities/getFile';
import UploadButton from '.';
import clickHandler from './clickHandler';

jest.mock('./clickHandler');
jest.mock('utilities/getFile');

const getFileMock = getFile as jest.Mock<any>;
const clickHandlerMock = clickHandler as jest.Mock<any>;

const mockFile = new File(['file'], 'test.png', { type: 'image/png' });

getFileMock.mockReturnValue({ fileUrl: 'mockFileUrl', file: mockFile });
describe('UploadButton', () => {
  const name = 'image';
  const setFieldValue = jest.fn();
  const buttonText = 'Upload avatar';
  afterAll(() => jest.restoreAllMocks());
  it('render UploadButton', () => {
    expect.assertions(3);
    const { getByTestId, getByText } = render(
      <UploadButton name={name} setFieldValue={setFieldValue} />,
    );
    const uploadButton = getByText(buttonText);
    const input = getByTestId('input');
    userEvent.click(uploadButton);

    expect(clickHandlerMock).toHaveBeenCalledTimes(1);

    fireEvent.change(input, {
      target: {
        files: [mockFile],
      },
    });
    expect(getFileMock).toHaveBeenCalledTimes(1);
    expect(setFieldValue).toHaveBeenCalledWith('image', mockFile);
  });
});
