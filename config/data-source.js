import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User.js";
import { Token } from "../entities/Token.js";
import { Organisation } from "../entities/Organisation.js";
import { Document } from "../entities/Documents.js";
import { UserOrganisations } from "../entities/UsersOrgs.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: "5432",
  username: process.env.LOGIN,
  password: process.env.PASSWORD,
  database: "code_doc",
  entities: [User, Token, Organisation, Document, UserOrganisations],
  synchronize: false,
  logging: true,
});
