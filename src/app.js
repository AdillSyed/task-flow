import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express(); // Initialize Express app

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies from coming requests and makes them available on req.cookies

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow cookies to be sent for cookie based authentication
  })
);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

export default app;