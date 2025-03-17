import { EntitySchema } from "typeorm";
import { User } from "./User.js";
import { Organisation } from "./Organisation.js";

export const Document = new EntitySchema({
  name: "Document",
  tableName: "code_document",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
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
      type: "uuid",
      nullable: false,
    },
    org_id: {
      type: "uuid",
      nullable: false,
    },
    created_at: {
      type: "timestamptz",
      default: () => "NOW()",
      nullable: false,
    },
    updated_at: {
      type: "timestamptz",
      nullable: false,
      onUpdate: "NOW()",
    },
    updated_id: {
      type: "uuid",
      nullable: false,
    },
  },
  relations: {
    creator: {
      target: User,
      type: "many-to-one",
      joinColumn: { name: "creator_id" },
      onDelete: "CASCADE",
    },
    updater: {
      target: User,
      type: "many-to-one",
      joinColumn: { name: "updated_id" },
      onDelete: "CASCADE",
    },
    organisation: {
      target: Organisation,
      type: "many-to-one",
      joinColumn: { name: "org_id" },
      onDelete: "CASCADE",
    },
  },
});
