# 💬 Messaging App

A full-stack **real-time messaging dashboard** built with **React, Express, Prisma, Socket.io**, and **Supabase (PostgreSQL)**.  
It allows customer service teams to view, reply, and manage customer conversations — similar to a WhatsApp-style chat interface, powered by WebSockets for instant message updates.

---

## 🚀 Features

- 📂 **CSV Import** — Load historical chat data from a CSV file into the Supabase PostgreSQL database.  
- 💾 **Database Integration** — Uses Prisma ORM for schema management and database access.  
- ⚡ **Real-Time Messaging** — Messages are updated instantly across all connected clients via **Socket.IO WebSockets**.  
- 💬 **Chat Interface** — Frontend built with React that resembles WhatsApp:
  - Customer messages appear on the **left**.
  - Replies from the agent appear on the **right**, with **bubble tails** and timestamps.
- 🔔 **Unread Message Counter** — Each chat in the list shows unread messages dynamically.
- 📡 **WebSocket-based Live Updates** — No manual refresh required — new messages appear immediately.
- 🎨 **Modern UI** — Built with modular React components and CSS styling.

---

## 🧠 Project Overview

### Data Source
All messages originate from a CSV file containing user messages. This CSV is imported into the Supabase PostgreSQL database using Prisma and Node.js.

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React (Create React App) |
| **Backend** | Express.js (Node.js) |
| **Database** | Supabase PostgreSQL |
| **ORM** | Prisma |
| **Real-time** | Socket.IO |
| **Styling** | Custom CSS (WhatsApp-style UI) |

---

## 🗂️ Folder Structure

```
Branch_International/
├── prisma/
│ └── schema.prisma
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Navbar/
│ │ │ ├── ChatList/
│ │ │ ├── ChatArea/
│ │ │ └── Message/
│ │ ├── hooks/
│ │ │ └── useWebSocket.js
│ │ ├── services/
│ │ │ └── api.js
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
├── importCSV.js
├── server.js
├── package.json
├── package-lock.json
└── GeneralistRails_Project_MessageData.csv
```


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/mahmoodalisha/Branch_International.git
cd Branch_International
```

### 2️⃣ Install dependencies
```
npm install
```

### 3️⃣ Configure your environment
Create a .env file in the root folder and add your Supabase/PostgreSQL connection string:
```
DATABASE_URL="postgresql://user:password@host:port/dbname?sslmode=require"
```

### 🧩 Database Setup (Prisma + Supabase)
Push schema to database:
```
npx prisma db push
```
Generate Prisma client:
```
npx prisma generate
```
Import CSV data:
```
node importCSV.js
```
This script reads GeneralistRails_Project_MessageData.csv and inserts all messages into the Message table in Supabase.
Start the Express + Socket.io backend: 
```
node server.js
```
Server runs at:
👉 http://localhost:8000

### Endpoints:
* GET /messages → Fetch all messages
* GET /messages/:id → Fetch a specific message
* POST /messages/:id/reply → Send a reply to a message
* POST /messages/new → Create a new incoming message

### 💻 Running the Frontend

In another terminal:
```
cd frontend
npm start
```

Frontend runs at:
👉 http://localhost:3000
🔄 Real-Time Messaging (WebSockets)

The app uses Socket.IO to handle instant two-way communication between server and clients.
How it works:
1. When a client connects, the server listens for events
2. When a new message or reply is created (POST /messages/new or /messages/:id/reply),
the server emits a new-message event to all connected clients
3. On the frontend, the custom React hook useWebSocket.js listens for these events and updates the message list in real time
4. The chat UI updates instantly — no refresh needed.

### 🪄 WhatsApp-style Chat Interface
Messages are visually separated: <br>
Customer messages → Left-aligned, white background. <br>
My replies → Right-aligned, golden gradient bubbles with tails. <br>
Each message also displays its timestamp (HH:MM format) and scrolls smoothly as new messages arrive.

### 💬 Summary
This app demonstrates a real-world customer support chat system: <br>
Historical data loaded via CSV → PostgreSQL → Prisma <br>
Live communication via Socket.IO <br>
Interactive UI built with React <br>
Together, it provides a simple but powerful messaging experience where agents and customers communicate seamlessly in real time.