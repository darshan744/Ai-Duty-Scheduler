import app from "./app";

import environments from "./environments";
import logger from "./Utils/Logger";

const port = environments.PORT;

if (!port) {
  console.log("Port is not defined ");
  process.exit(1);
}
app.listen(environments.PORT, () => {
  logger.info(`Server running in port : ${port}`);
});
