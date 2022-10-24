import express from "express";
import cors from "cors"
import helmet from "helmet";
import morgan from "morgan"
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";

import { Response, Request, NextFunction, json } from "express";


const app = express()

app.enable("trust proxy");

app.use(cors());
app.options("*", cors());

app.use(helmet());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

const limiter = rateLimit({
    max: 100,
    windowMs: 1000 * 60,
    message: "Too many requests from this IP, please try again in a minute."
})

app.use("/api", limiter);

app.use(mongoSanitize());

app.use(compression());

app.use(json())

export default app;