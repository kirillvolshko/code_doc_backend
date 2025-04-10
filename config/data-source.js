import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "dotenv";
import { User } from "../entities/User.js";
import { Token } from "../entities/Token.js";
import { Project } from "../entities/Project.js";
import { Document } from "../entities/Documents.js";
import { UserProjects } from "../entities/UserProjects.js";
import { Comment } from "../entities/Comments.js";
import { Notification } from "../entities/Notification.js";
config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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
