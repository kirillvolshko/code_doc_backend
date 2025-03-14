import { EntitySchema } from "typeorm";
import { User } from "./User.js";

export const Token = new EntitySchema({
  name: "Token",
  tableName: "token",
  columns: {
    user_id: {
      type: "uuid",
      primary: true,
      nullable: false,
    },
    refreshtoken: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
  },
  relations: {
    user: {
      target: User,
      type: "many-to-one",
      joinColumn: { name: "user_id" },
      onDelete: "CASCADE",
    },
  },
});
