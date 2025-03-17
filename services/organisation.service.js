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

  const createOrganisation = orgRepository.create({
    name: name,
    creator_id: creator_id,
  });
  await orgRepository.save(createOrganisation);

  const org_id = createOrganisation.id;

  const addToUserOrg = userOrgRepository.create({
    org_id: org_id,
    user_id: creator_id,
  });
  await userOrgRepository.save(addToUserOrg);

  return createOrganisation;
};

export const deleteOrganisationService = async (id) => {
  await userOrgRepository.delete({ org_id: id });
  const deleteOrganisation = await orgRepository.delete(id);
  return deleteOrganisation;
};
