import { MongoClient, type Db } from "mongodb";

const uri = process.env["MONGODB_URI"];
const database = process.env["MONGODB_DATABASE"] || "davutoglu";

declare global {
  var __davutogluMongo: Promise<MongoClient> | undefined;
}

export async function getDatabase(): Promise<Db> {
  if (!uri) throw new Error("MONGODB_URI tanımlı değil.");
  global.__davutogluMongo ??= new MongoClient(uri).connect();
  return (await global.__davutogluMongo).db(database);
}
