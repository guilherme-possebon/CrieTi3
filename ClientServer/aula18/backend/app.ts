import express, { Express } from "express";
import cors from "cors";
import livroRoutes from "./routes/livroRoutes";
import categoriaRoutes from "./routes/categoriaRoutes";

const app: Express = express();
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => res.status(200).json("Olá, mundo!"));

// Use the routes
app.use("/livro", livroRoutes);
app.use("/categoria", categoriaRoutes);

export default app;
