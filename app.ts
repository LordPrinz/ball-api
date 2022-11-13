import express from "express";
import cors from "cors";
import helmet, { xssFilter } from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import { json } from "express";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import globalErrorHandler from "./controllers/errorController";
import AppError from "./utils/AppError";
import playerRoute from "./routes/playerRouter";

const app = express();

app.enable("trust proxy");

app.use(cors());
app.options("*", cors() as any);

app.use(helmet());

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

const limiter = rateLimit({
	max: 100,
	windowMs: 1000 * 60,
	message: "Too many requests from this IP, please try again in a minute.",
});

app.use("/api", limiter);

app.use(json());

app.use(cookieParser());

app.use(mongoSanitize());

app.use(xssFilter());

app.use(
	hpp({
		whitelist: ["age", "role", "club"],
	})
);

app.use(compression());

app.use((req, res, next) => {
	(req as any).requestTime = new Date().toISOString();
	next();
});

// ROUTES
app.use("/api/v1/players", playerRoute);

app.all("*", (req, res, next) => {
	new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
});

app.use(globalErrorHandler);

export default app;
