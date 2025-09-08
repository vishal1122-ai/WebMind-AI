import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import actionRouter from "./routes/actionRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

// Basic rate-limit (per IP)
app.use(
  rateLimit({
    windowMs: 60_000,
    max: 30,
    message: { error: "Too many requests" },
  })
);

// Attach API key to req for downstream access
app.use((req, _res, next) => {
  req.openrouterApiKey = process.env.OPENROUTER_API_KEY;
  next();
});

app.use("/process", actionRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`WebMind backend running on port ${PORT}`));
