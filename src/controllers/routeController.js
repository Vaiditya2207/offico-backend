import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, '../routes'); 

async function importFunctionsFromDirectory() {
  try {
    const files = await fs.promises.readdir(directoryPath);
    const importPromises = files
      .filter(file => path.extname(file) === '.js')
      .map(file => import(path.join(directoryPath, file)).then(module => module.default));

    const modules = await Promise.all(importPromises);
    return modules;
  } catch (err) {
    console.log('Unable to scan directory: ' + err);
    return [];
  }
}

export default importFunctionsFromDirectory;