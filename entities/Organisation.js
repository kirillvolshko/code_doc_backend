import { EntitySchema } from "typeorm";

export const Organisation = new EntitySchema({
  name: "Organisation",
  tableName: "organisation",
  columns: {
    id: {
      type: "varchar",
      length: 255,
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
      type: "many-to-many",
      joinColumn: { name: "creator_id" },
      onDelete: "CASCADE",
    },
  },
});
