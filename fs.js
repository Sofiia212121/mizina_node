import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import os from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "hw1.txt");

const arrOS = [
  { platform: os.platform() },
  { architecture: os.arch() },
  { cpu: os.cpus() },
  { freeMemory: os.freemem() },
  { totalMemory: os.totalmem() },
  { userDir: os.homedir() },
  { uptime: os.uptime() },
];

fs.writeFile(filePath, JSON.stringify(arrOS, null, 2), (err) => {
  if (err) {
    console.log(`Error: ${err}`);
  } else {
    console.log("File created!");
  }
});
