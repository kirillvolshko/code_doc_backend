import {
  getProjectByUserService,
  addUserToProjectService,
  createProjectService,
  getProjectByIdService,
} from "../services/project.service.js";

export const getProjectByUser = async (req, res) => {
  try {
    const getProjectByUser = await getProjectByUserService(req.params.id);
    res.json(getProjectByUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getProjectById = async (req, res) => {
  try {
    const getProjectById = await getProjectByIdService(req.params);
    res.json(getProjectById);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addUserToProject = async (req, res) => {
  try {
    const addUserToProject = await addUserToProjectService(req.body);
    if (addUserToProject) res.status(200).json("Add user on project success");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUserFromProject = async (req, res) => {
  try {
    const deleteUserFromProject = await deleteUserFromProject(req.body);
    if (deleteUserFromProject) res.status(200).json("Delete user success");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createProject = async (req, res) => {
  try {
    const createProject = await createProjectService(req.body);
    if (createProject) res.status(200).json("Create project success");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteProject = async (req, res) => {
  try {
    const deleteProject = await createProjectService(req.params.id);

    if (deleteProject) res.status(200).json("Delete project succes");
  } catch (error) {
    res.status(500).json(error);
  }
};
