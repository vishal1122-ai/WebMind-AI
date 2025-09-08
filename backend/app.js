// app.js
import express from "express";
import cors from "cors";
import actionRouter from "./src/routes/actionRouter.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", actionRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
