import { Server } from "@hapi/hapi";
import { seed } from "./config/database";
import { addPrefixToPaths } from "./v1/helpers/path";
import routes from "./v1/routes";

const init = async () => {
  const server = new Server({
    port: 3000,
    host: "localhost",
  });

  server.route(addPrefixToPaths(routes, "/api/v1"));

  await seed();
  await server.start();

  console.log(`Server running on ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
