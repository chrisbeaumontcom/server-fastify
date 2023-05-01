export async function routes(app, options) {
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
}
