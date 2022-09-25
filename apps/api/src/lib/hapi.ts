import { Server } from "@hapi/hapi";
import { addPrefixToPaths } from "../v1/helpers/path";
import routes from "../v1/routes";

const server = new Server({
  port: 3001,
  host: "localhost",
  routes: {
    cors: true,
  },
});

server.route(addPrefixToPaths(routes, "/api/v1"));
server.route({
  method: "GET",
  path: "/",
  handler: function () {
    return "Hello World!";
  },
});
const serverInit = async () => {
  await server.initialize();
  return server;
};

const serverStart = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  return server;
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

export { serverStart, serverInit };
