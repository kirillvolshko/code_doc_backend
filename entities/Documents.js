import { EntitySchema } from "typeorm";
import { User } from "./User.js";

export const Document = new EntitySchema({
  name: "Document",
  tableName: "code_document",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      nullable: false,
    },
    title: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    content: {
      type: "text",
      nullable: false,
    },
    creator_id: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    org_id: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    created_at: {
      type: "timestamptz",
      nullable: false,
    },
    updated_at: {
      type: "timestamptz",
      nullable: false,
    },
    updated_id: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
  },
  relations: {
    user: {
      target: User,
      type: "many-to-many",
      joinColumn: { name: "creator_id", name: "updated_id" },
      onDelete: "CASCADE",
    },
  },
});
