import { EntitySchema } from "typeorm";
import { Organisation } from "./Organisation.js";
import { User } from "./User.js";

export const UserOrganisations = new EntitySchema({
  name: "UserOrganisations",
  tableName: "user_organisations",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    org_id: {
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
      target: Organisation,
      type: "many-to-many",
      joinColumn: { name: "org_id" },
      onDelete: "CASCADE",
    },
  },
});
