import {
  addUserToOrganisationService,
  createOrganisationService,
  deleteUserFromOrganisationService,
  getOrganisationByUserService,
  deleteOrganisationService,
} from "../services/organisation.service.js";

export const getOrganisationByUser = async (req, res) => {
  try {
    const getOrganisationByUser = await getOrganisationByUserService(
      req.params.id
    );
    res.json(getOrganisationByUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addUserToOrganisation = async (req, res) => {
  try {
    const addUserToOrganisation = await addUserToOrganisationService(req.body);
    if (addUserToOrganisation)
      res.status(200).json("Add user in organisation success");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUserFromOrganisation = async (req, res) => {
  try {
    const deleteUserFromOrganisation = await deleteUserFromOrganisationService(
      req.body
    );
    if (deleteUserFromOrganisation) res.status(200).json("Delete success");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createOrganisation = async (req, res) => {
  try {
    const createOrganisation = await createOrganisationService(req.body);
    if (createOrganisation) res.status(200).json("Create organisation success");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteOrganisation = async (req, res) => {
  try {
    console.log(req.params.id);
    const deleteOrganisation = await deleteOrganisationService(req.params.id);

    if (deleteOrganisation) res.status(200).json("Delete organisation succes");
  } catch (error) {
    res.status(500).json(error);
  }
};
