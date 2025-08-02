import { connect } from "mongoose";
import environments from "./environments";

function connectToDB() {
  const databaseUrl = environments.DB_URL;

  if (!databaseUrl) {
    console.log("Database Url is undefined");
    process.exit(1);
  }
}

export { connectToDB };
