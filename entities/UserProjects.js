import { EntitySchema } from "typeorm";
import { Project } from "./Project.js";
import { User } from "./User.js";

export const UserProjects = new EntitySchema({
  name: "UserProjects",
  tableName: "user_projects",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    project_id: {
      type: "varchar",
      length: 255,
    },
    user_id: {
      type: "varchar",
      length: 255,
    },
  },
  relations: {
    user: {
      target: User,
      type: "many-to-many",
      joinColumn: { name: "user_id" },
      onDelete: "CASCADE",
    },
    org: {
      target: Project,
      type: "many-to-many",
      joinColumn: { name: "project_id" },
      onDelete: "CASCADE",
    },
  },
});
