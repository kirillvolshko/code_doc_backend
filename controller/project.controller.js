import {
  getProjectByUserService,
  addUserToProjectService,
  createProjectService,
  getProjectByIdService,
  getUsersByProjectService,
} from "../services/project.service.js";

export const getProjectByUser = async (req, res, next) => {
  try {
    const getProjectByUser = await getProjectByUserService(req.params.id);
    res.json(getProjectByUser);
  } catch (error) {
    next(error);
  }
};

export const getUsersByProject = async (req, res, next) => {
  try {
    const getUsersByProject = await getUsersByProjectService(req.params.id);
    res.status(200).json(getUsersByProject);
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const getProjectById = await getProjectByIdService(req.params.id);
    res.json(getProjectById);
  } catch (error) {
    next(error);
  }
};

export const addUserToProject = async (req, res, next) => {
  try {
    const addUserToProject = await addUserToProjectService(req.body);
    if (addUserToProject) res.status(200).json("Add user on project success");
  } catch (error) {
    next(error);
  }
};

export const deleteUserFromProject = async (req, res, next) => {
  try {
    const deleteUserFromProject = await deleteUserFromProject(req.body);
    if (deleteUserFromProject) res.status(200).json("Delete user success");
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const createProject = await createProjectService(req.body);
    if (createProject) res.status(200).json("Create project success");
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const deleteProject = await createProjectService(req.params.id);

    if (deleteProject) res.status(200).json("Delete project succes");
  } catch (error) {
    next(error);
  }
};
