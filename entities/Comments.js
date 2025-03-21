import { EntitySchema } from "typeorm";
import { User } from "./User.js";
import { Document } from "./Documents.js";

export const Comment = new EntitySchema({
  name: "Comment",
  tableName: "comments",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    creator_id: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    content: {
      type: "text",
    },
    doc_id: {
      type: "uuid",
      nullable: false,
    },
    created_at: {
      type: "timestamptz",
      default: () => "NOW()",
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
    document: {
      target: Document,
      type: "many-to-one",
      joinColumn: { name: "doc_id" },
      onDelete: "CASCADE",
    },
  },
});
