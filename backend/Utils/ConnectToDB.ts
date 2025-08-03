import { connect } from "mongoose";
import environments from "../environments";
import logger from "./Logger";

export default async function connectToDB() {
  const databaseUrl = environments.DB_URL;
  // if not db url exit code
  if (!databaseUrl) {
    logger.error("Database url not found");
    process.exit(1);
  }
  logger.debug("Connecting to mongodb instance using url " + databaseUrl);
  // ignore connection result since using global connection
  try {
    await connect(databaseUrl);
  } catch (error: any) {
    logger.error(`Error in mongodb Connection ${error.message}`);
    process.exit(1);
  }
  // if need multipe db cnonection instances use :
  // createConnection() which will return a mongoose object with which u can create schema and models
}
