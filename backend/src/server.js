import express from 'express';
import fetch from "node-fetch";
import path from 'path';
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { inngest, functions } from "./lib/inngest.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";

const app = express();

const __dirname = path.resolve();

app.use(express.json());

app.use(clerkMiddleware());

app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
    signingKey: ENV.INNGEST_SIGNING_KEY,
  })
);
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

app.post("/run", async (req, res) => {
  const { language, code } = req.body;

  try {
    const response = await fetch("http://localhost:2000/api/v2/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        language: language,
        version: getVersion(language),
        files: [{ content: code }]
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Execution failed" });
  }
});

// language version helper
function getVersion(lang) {
  return "*";
}

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});



const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => console.log("Server is running on port:", ENV.PORT));
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();