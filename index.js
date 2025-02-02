import { createServer } from "http";
import { URL } from "url";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

function sendFileContent(response, filename) {
  const contentTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".gif": "image/gif",
  };

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  fs.readFile(path.join(__dirname, "public", filename), "utf8", (err, data) => {
    if (err) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("Internal Server Error");
      return;
    }

    const ext = path.extname(filename);
    const contentType = contentTypes[ext];
    response.writeHead(200, { "Content-Type": contentType });
    response.end(data);
  });
}

const messages = [];

const server = createServer((req, res) => {
  const baseURL = `http://${req.headers.host}`;
  const urlObj = new URL(req.url, baseURL);
  const url = urlObj.pathname;

  console.log(`Request received for URL: ${url}`);

  switch (url) {
    case "/favicon.ico":
      res.end("no favicon");
      break;
    case "/":
      sendFileContent(res, "index.html");
      break;
    case "/contacts":
      sendFileContent(res, "contacts.html");
      break;
    case "/summ":
      sendFileContent(res, "summ.html");
      break;
    case "/chat":
      sendFileContent(res, "chat.html");
      break;
    case "/chatAPI/sendMassage":
      const senderApiUrl = new URL(`http:/${req.url}`);
      const message = new URLSearchParams(senderApiUrl.searchParams).get(
        "message"
      );
      console.log("message received:", message);
      res.end(JSON.stringify("thanks"));
      break;
    case "/api/someData":
      const num1 = parseFloat(urlObj.searchParams.get("num1"));
      const num2 = parseFloat(urlObj.searchParams.get("num2"));

      const result = { result: num1 + num2 };
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
      break;
    case "/api/quadraticEquation":
      const a = parseFloat(urlObj.searchParams.get("a"));
      const b = parseFloat(urlObj.searchParams.get("b"));
      const c = parseFloat(urlObj.searchParams.get("c"));

      const discrim = b * b - 4 * a * c;
      let equationResult;

      if (discrim > 0) {
        const root1 = (-b + Math.sqrt(discrim)) / (2 * a);
        const root2 = (-b - Math.sqrt(discrim)) / (2 * a);
        equationResult = `x1 = ${root1}, x2 = ${root2}`;
      } else if (discrim === 0) {
        const root = -b / (2 * a);
        equationResult = `x = ${root}`;
      } else {
        equationResult = "No real roots";
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ result: equationResult, discriminant: discrim })
      );
      break;
    default:
      const ext = path.extname(url);
      if (!ext) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("404");
        break;
      } else {
        sendFileContent(res, url);
      }
  }
});

server.listen(3000, () => {
  console.log("Server started on port 3000");
});
