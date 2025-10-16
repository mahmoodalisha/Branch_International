import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());


const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
});


async function testDB() {
  try {
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log("DB connected!", result);
  } catch (err) {
    console.error("DB connection failed:", err);
  }
}
testDB();


io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});


app.get("/messages", async (req, res) => {
  const messages = await prisma.message.findMany({
    orderBy: { timestamp: "desc" },
    include: { customer: true },
  });
  res.json(messages);
});


app.get("/messages/:id", async (req, res) => {
  const { id } = req.params;
  const message = await prisma.message.findUnique({
    where: { id: parseInt(id) },
    include: { customer: true },
  });
  res.json(message);
});


app.post("/messages/:id/reply", async (req, res) => {
  const { id } = req.params;
  const { replyText } = req.body;

  const originalMessage = await prisma.message.findUnique({ where: { id: parseInt(id) } });
  if (!originalMessage) return res.status(404).json({ error: "Message not found" });

  const reply = await prisma.message.create({
    data: {
      userId: originalMessage.userId,
      timestamp: new Date(),
      messageBody: replyText,
    },
  });


  io.emit("new-message", {
    id: reply.id,
    userId: reply.userId,
    timestamp: reply.timestamp,
    messageBody: reply.messageBody,
  });

  res.json(reply);
});


app.post("/messages/new", async (req, res) => {
  const { userId, messageBody } = req.body;
  const message = await prisma.message.create({
    data: { userId, messageBody, timestamp: new Date() },
  });

  
  io.emit("new-message", message);

  res.json(message);
});


httpServer.listen(8000, () => console.log("Server running on http://localhost:8000"));



//GET all messages http://localhost:8000/messages

//GET one message http://localhost:8000/messages/1

/*POST a reply http://localhost:8000/messages/1/reply
{
  "replyText": "Thank you for your message, we are looking into it."
}
Response will be the new message created in the DB.
*/