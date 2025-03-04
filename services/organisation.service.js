import db from "../config/db.js";

export const getOrganisationByUserService = async (id) => {
  const userOrgs = await db.query(
    `SELECT * FROM user_organisations WHERE user_id = $1`,
    [id]
  );

  if (userOrgs.rows.length === 0) {
    throw new Error("Id user error");
  }
  const orgIds = userOrgs.rows.map((org) => org.org_id);
  const organisations = await db.query(
    `SELECT * FROM organisation WHERE id = ANY($1)`,
    [orgIds]
  );

  return organisations.rows;
};

export const addUserToOrganisationService = async (body) => {
  const { user_id, org_id } = body;
  const addUserToOrganisation = await db.query(
    `INSERT INTO user_organisations(org_id, user_id) VALUES ($1, $2)`,
    [org_id, user_id]
  );

  return addUserToOrganisation;
};

export const deleteUserFromOrganisationService = async (body) => {
  const { user_id, org_id } = body;
  const deleteUserFromOrganisation = await db.query(
    `DELETE FROM user_organisations where org_id=$1 AND user_id=$2`,
    [org_id, user_id]
  );
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
