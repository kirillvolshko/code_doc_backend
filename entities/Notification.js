import { EntitySchema } from "typeorm";
import { User } from "./User.js";
import { Project } from "./Project.js";

export const Notification = new EntitySchema({
  name: "Notification",
  tableName: "notification",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
      nullable: false,
    },
    notification: {
      type: "text",
      nullable: false,
    },
    user_id: {
      type: "uuid",
      nullable: false,
    },
    project_id: {
      type: "uuid",
      nullable: false,
    },
    created_at: {
      type: "timestamptz",
      default: () => "NOW()",
      nullable: false,
    },
    isRead: {
      type: "boolean",
      default: false,
    },
  },
  relations: {
    user: {
      target: User,
      type: "many-to-one",
      joinColumn: { name: "user_id" },
      onDelete: "CASCADE",
    },
    project: {
      target: Project,
      type: "many-to-one",
      joinColumn: { name: "project_id" },
      onDelete: "CASCADE",
    },
  },
});
