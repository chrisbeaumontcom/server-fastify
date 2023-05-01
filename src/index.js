import "./env.js";
import { fastify } from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";
import { connectDb } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;

const app = fastify();

async function startApp() {
  try {
    app.register(fastifyStatic, {
      root: path.join(__dirname, "public"),
    });

    app.get("/", {}, async (request, reply) => {
      console.log("/");
      try {
        await reply.sendFile("index.html");
      } catch (error) {
        console.error("/", error);
      }
    });

    app.get("/test", {}, (request, reply) => {
      console.log("/test");
      try {
        reply.send({ success: true, page: "test" });
      } catch (error) {
        console.error("/test", error);
      }
    });

    await app.listen({ port: PORT });
    console.log(`API Server started at port ${PORT}`);
  } catch (err) {
    console.error(err);
  }
}
connectDb().then(() => {
  startApp();
});
