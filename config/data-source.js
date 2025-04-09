import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User.js";
import { Token } from "../entities/Token.js";
import { Project } from "../entities/Project.js";
import { Document } from "../entities/Documents.js";
import { UserProjects } from "../entities/UserProjects.js";
import { Comment } from "../entities/Comments.js";
import { Notification } from "../entities/Notification.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  // host: "localhost",
  // port: "5432",
  // username: process.env.LOGIN,
  // password: process.env.PASSWORD,
  // database: "code_doc",
  url: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [
    User,
    Token,
    Project,
    Document,
    UserProjects,
    Comment,
    Notification,
  ],
  synchronize: false,
  logging: true,
});
