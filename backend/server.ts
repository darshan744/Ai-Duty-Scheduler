import app from "./app";

import environments from "./environments";

const port = environments.PORT;

if (!port) {
  console.log("Port is not defined ");
  process.exit(1);
}
app.listen(environments.PORT, () => {
  console.log(`Server running in ${port}`);
});
