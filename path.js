import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __basename = path.basename(__filename);
const __dirname = path.dirname(__filename);
const __extname = path.extname(__filename);

console.clear();
console.log(`Повний шлях: ${__filename}`);
console.log(`Ім'я файлу: ${__basename}`);
console.log(`Шлях до кореневого каталогу: ${__dirname}`);
console.log(`Розширення: ${__extname}`);

console.log(`Парсед ім'я: ${path.parse(__filename).name}`);
console.log(path.join(__dirname, 'server', 'qweqwe', 'index.html'))