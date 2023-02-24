import { DataSource } from "typeorm";
import "dotenv/config";

const MongoConnection = new DataSource({
  type: "mongodb",
  url: process.env.MONGO_URL,
  database: process.env.MONGO_DB,
  useUnifiedTopology: true,
  entities: [
    "./src/modules/**/infra/typeorm/schemas/*.ts",
  ],
});

MongoConnection.initialize()
  .then((connection) => {
    console.log("Data Source Mongodb has been initialized!");
  })
  .catch((err) => {
    console.log(err);
    console.error("Error during Data Source Mongodb initialization", err);
  });

export { MongoConnection };
