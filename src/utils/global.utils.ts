import path from "path";
import fs from "fs";

const cleanString = (value: string): string => value.toLowerCase().trim();

const ensureDirectoryExists = (dirPath: string): void => {
  const resolvedPath = path.resolve(dirPath);

  if (!fs.existsSync(resolvedPath)) {
    fs.mkdirSync(resolvedPath, { recursive: true });
  }
};
export default {
  cleanString,
  ensureDirectoryExists,
};
