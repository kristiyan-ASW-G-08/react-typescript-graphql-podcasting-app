import fs from 'fs';

const deleteFile = async (path: string | undefined): Promise<void> => {
  if (path !== undefined) {
    // @ts-ignore
    fs.access(path, fs.F_OK, (err: any): void => {
      if (err) {
        throw err;
      }
    });
    fs.unlink(path, (err): void => {});
  }
};
export default deleteFile;
