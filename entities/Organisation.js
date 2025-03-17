import { EntitySchema } from "typeorm";
import { User } from "./User.js";

export const Organisation = new EntitySchema({
  name: "Organisation",
  tableName: "organisation",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    name: {
      type: "varchar",
      length: 255,
    },
    creator_id: {
      type: "uuid",
      nullable: false,
    },
  },
  relations: {
    user: {
      target: User,
      type: "many-to-one",
      joinColumn: { name: "creator_id" },
      onDelete: "CASCADE",
    },
  },
});
