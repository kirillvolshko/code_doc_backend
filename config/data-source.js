import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: "5432",
  username: process.env.LOGIN,
  password: process.env.PASSWORD,
  database: "code_doc",
  entities: [User],
  synchronize: false,
  //   logging: true,
});
