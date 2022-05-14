import fs from 'fs';
import path from 'path';

const writeFile = (
  filename: string,
  stream: NodeJS.ReadWriteStream,
): string => {
  // @ts-ignore
  const filePath = path.join(
    path.basename(path.dirname(filename)),
    `/images/${new Date().toISOString()}-${filename}`,
  );
  stream.pipe(fs.createWriteStream(filePath));
  return filePath;
};

export default writeFile;
