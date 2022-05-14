import mockFs from 'mock-fs';
import writeFile from '@customUtilities/writeFile';

describe('writeFile', () => {
  afterEach(mockFs.restore);
  it('should call pipe', async () => {
    const filename = 'someFile.jpg';
    const pipe = jest.fn();
    const stream = jest.fn(() => Promise.resolve({ pipe }));
    // @ts-ignore
    writeFile(filename, stream);
    expect(pipe).toHaveBeenCalledTimes(1);
  });
});
