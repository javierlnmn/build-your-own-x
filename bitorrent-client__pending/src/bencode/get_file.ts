import fs from 'fs';

export const getFile = (fileName: string): Buffer => fs.readFileSync(fileName);
