import fs from 'fs';
import path from 'path';

const writeFile = (
  filename: string,
  stream: NodeJS.ReadWriteStream,
  folder: 'images' | 'audiofiles' = 'images',
): string => {
  // @ts-ignore
  const filePath = path.join(
    path.basename(path.dirname(filename)),
    `/${folder}/${new Date().toISOString().replace(/:/g, '-')}${filename}`,
  );
  stream.pipe(fs.createWriteStream(filePath));
  return filePath;
};

export default writeFile;
