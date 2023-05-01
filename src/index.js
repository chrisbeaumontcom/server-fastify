import "./env.js";
import { fastify } from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";
import { connectDb } from "./db.js";
import { routes } from "./routes/routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;

const app = fastify();

async function startApp() {
  try {
    app.register(fastifyStatic, {
      root: path.join(__dirname, "public"),
    });

    app.register(routes);

    app.listen({ port: PORT });
    console.log(`API Server started at port ${PORT}`);
  } catch (err) {
    console.error(err);
  }
}

connectDb().then(() => {
  startApp();
});
