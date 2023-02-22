import { DataSource } from "typeorm";
import "dotenv/config";

const MongoConnection = new DataSource({
  type: "mongodb",
  host: `${process.env.MONGO_HOST}`,
  port: Number(process.env.MONGO_PORT),
  database: process.env.MONGO_DB,
  useUnifiedTopology: true,
  entities: [
    "./src/modules/**/infra/typeorm/schemas/*.ts",
    "./src/shared/services/**/infra/typeorm/schemas/*.ts",
  ],
});

MongoConnection.initialize()
  .then(() => {
    console.log("Data Source Mongodb has been initialized!");
  })
  .catch((err) => {
    console.log(err);
    console.error("Error during Data Source Mongodb initialization", err);
  });

export { MongoConnection };
