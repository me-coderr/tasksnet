import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { router as testRoutes } from "./routes/testRoutes";
import { router as taskRoutes } from "./routes/tasksRoutes";
import cors from "cors";
import { connectDB } from "./config/db";

const app: Express = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB();

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/test", testRoutes);
app.use("/api/tasks", taskRoutes);

const server = app.listen(PORT, (): void => {
  console.log(`Server listening at ${PORT}`);
});

server.on("error", (err: Error): void => {
  console.error(
    `\n----\nError while starting server : ${err.message}\n${err}\n----\n`
  );
  throw err;
});
