const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const messages = [];

const server = http.createServer((req, res) => {
  const reqURL = url.parse(req.url, true);
  const pathname = reqURL.pathname;
  const searchParams = new URLSearchParams(reqURL.search);

  switch (pathname) {
    case "/":
      fs.readFile(path.join(__dirname, "index.html"), "utf8", (err, data) => {
        if (err) {
          console.error(err);
          res.writeHead(404);
          res.end("error");
        }
        res.writeHead(200, {
          "Content-Type": "text/html",
        });
        res.end(data);
      });
      break;
    case "/newMessage":
      const username = searchParams.get("username");
      const text = searchParams.get("text");
      const userId = searchParams.get("userId");
      const newMessage = { userId, username, text };

      if (userId && username && text) {
        messages.push(newMessage);
        const messagesResponse = JSON.stringify(messages);
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(messagesResponse);
      }
      break;
    case "/getMessages":
      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      const messagesResponse = JSON.stringify(messages);
      res.end(messagesResponse);
      break;
    case "/style.css":
      fs.readFile(path.join(__dirname, "style.css"), "utf8", (err, data) => {
        if (err) {
          console.error(err);
          res.writeHead(404);
          res.end("error");
        }
        res.writeHead(200, {
          "Content-Type": "text/css",
        });
        res.end(data);
      });
      break;
    case "/front.js":
      fs.readFile(path.join(__dirname, "front.js"), "utf8", (err, data) => {
        if (err) {
          console.error(err);
          res.writeHead(404);
          res.end("error");
        }
        res.writeHead(200, {
          "Content-Type": "text/javascript",
        });
        res.end(data);
      });
      break;
    case "/favicon.ico":
      res.writeHead(404);
      res.end("no icon");
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404");
  }
});

server.listen(5000, () => {});
