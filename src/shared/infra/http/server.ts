import "reflect-metadata";
import "dotenv/config";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { errors } from "celebrate";
import "express-async-errors";

import AppError from "../../errors/AppError";
import routes from "./routes";

const app = express();

app.use(cors({}));
app.use(express.json());
app.use(routes);

import "@shared/infra/typeorm/mongo";
import "@shared/container";

app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(process.env.APP_PORT, () => {
  console.log("🚀 Server started on port " + process.env.APP_PORT);
});
