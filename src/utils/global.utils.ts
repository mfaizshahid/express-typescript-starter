import fs from 'fs';
import moment from 'moment';
import path from 'path';

const cleanString = (value: string): string => value.toLowerCase().trim();

const ensureDirectoryExists = (dirPath: string): void => {
  const resolvedPath = path.resolve(dirPath);

  if (!fs.existsSync(resolvedPath)) {
    fs.mkdirSync(resolvedPath, { recursive: true });
  }
};

const formatDate = (date: string): string => {
  return moment(date).toDate().toDateString();
};
export default {
  cleanString,
  ensureDirectoryExists,
  formatDate,
};
