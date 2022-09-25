import { databaseInit, databaseSeed } from "./config/database";
import { serverStart } from "./lib/hapi";

databaseInit().then(() => {
  databaseSeed();
});

serverStart();
