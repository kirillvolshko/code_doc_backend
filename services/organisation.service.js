import db from "../config/db.js";
import { AppDataSource } from "../config/data-source.js";
import { Organisation } from "../entities/Organisation.js";
import { UserOrganisations } from "../entities/UsersOrgs.js";
import ApiError from "../exceptions/api-error.js";

const orgRepository = AppDataSource.getRepository(Organisation);
const userOrgRepository = AppDataSource.getRepository(UserOrganisations);

export const getOrganisationByUserService = async (id) => {
  const userOrgs = await userOrgRepository.findBy({ user_id: id });
  if (!userOrgs) {
    throw ApiError.BadRequest("Id user error");
  }
  const orgIds = userOrgs.map((org) => org.o);

  const organisations = await orgRepository.find({ id: orgIds });

  return organisations;
};

export const addUserToOrganisationService = async (body) => {
  const { user_id, org_id } = body;
  const addUserToOrganisation = userOrgRepository.create({
    org_id: org_id,
    user_id: user_id,
  });
  await userOrgRepository.save(addUserToOrganisation);
  return addUserToOrganisation;
};

export const deleteUserFromOrganisationService = async (body) => {
  const { user_id } = body;
  const deleteUserFromOrganisation = await userOrgRepository.delete({
    user_id: user_id,
  });

  return deleteUserFromOrganisation;
};

export const createOrganisationService = async (body) => {
  const { name, creator_id } = body;
  const createOrganisation = await db.query(
    `INSERT INTO organisation(name, creator_id) values ($1, $2) RETURNING *`,
    [name, creator_id]
  );
  const org_id = createOrganisation.rows[0].id;
  await db.query(
    `INSERT INTO user_organisations( org_id, user_id) VALUES ($1, $2)`,
    [org_id, creator_id]
  );
  return createOrganisation;
};

export const deleteOrganisationService = async (id) => {
  await db.query(`DELETE FROM user_organisations where org_id=$1`, [id]);
  const deleteOrganisation = await db.query(
    `DELETE FROM organisation where id=$1`,
    [id]
  );
  return deleteOrganisation;
};
