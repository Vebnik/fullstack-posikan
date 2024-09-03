import http from "node:http";
import express from "express";
import cors from "cors";
import WebSocket from "ws";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import messageRoute from "./routes/message.route";
import { messageEventEmitter } from "./events/mesasge.events";
import { IMessage } from "./interfaces/message.interface";

dotenv.config();

// express and ws
const app = express();
const port = process.env.PORT;

const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on("connection", (ws) => {
  ws.on("message", (m) => {
    webSocketServer.clients.forEach((client) => client.send(m));
  });

  ws.on("error", (e) => ws.send("Error"));

  ws.send("Established ws connection");
});

// global event listener
messageEventEmitter.on("updateMessageState", (data: IMessage[]) => {
  webSocketServer.clients.forEach((client) => {
    console.log(`[server] update message state`)
    client.send(JSON.stringify({ event: "messageData", data }));
  });
});

// app config
app.use(bodyParser.json());
app.use(cors());

// app route
app.use("/api/v1", messageRoute);

// app listen
server.listen(port, () => {
  console.log(`[server] Server is running at http://localhost:${port}`);
});
