import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "hw2.txt");

const guessedCompNum = 5;
let userNum;
let minVar = 0;
let maxVar = 10;
let count = 0;

function turn() {
  userNum = Math.round((minVar + maxVar) / 2);
  ++count;

  console.log(`Attempt: ${count}. Computer guessed: ${userNum}`);

  if (userNum === guessedCompNum) {
    console.log(`Correct! Number: ${guessedCompNum}. Attempts: ${count}`);
    gameResult(count, guessedCompNum);
    return;
  }

  if (userNum > guessedCompNum) {
    console.log("The guessed number is less.");
    maxVar = userNum - 1;
  } else {
    console.log("The guessed number is bigger.");
    minVar = userNum + 1;
  }

  setTimeout(turn, 1000);
}

function gameResult(count, guessedCompNum) {
  const gameData = {
    count: count,
    guessedCompNum: guessedCompNum,
  };

  fs.writeFile(filePath, JSON.stringify(gameData) + "\n", { flag: "a" }, (err) => {
    if (err) {
      console.error(`Error writing file: ${err}`);
    } else {
      console.log("Successfully saved!");
    }
  });
}

turn();
