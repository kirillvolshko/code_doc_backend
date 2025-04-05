import { AppDataSource } from "../config/data-source.js";
import { Project } from "../entities/Project.js";
import { UserProjects } from "../entities/UserProjects.js";
import ApiError from "../exceptions/api-error.js";
import { In } from "typeorm";

const projectRepository = AppDataSource.getRepository(Project);
const userProjectRepository = AppDataSource.getRepository(UserProjects);

export const getProjectByUserService = async (id) => {
  const userOrgs = await userProjectRepository.findBy({ user_id: id });

  if (!userOrgs) {
    throw ApiError.BadRequest("Id user error");
  }
  const projectIds = userOrgs.map((org) => org.project_id);

  const organisations = await projectRepository.findBy({ id: In(projectIds) });

  return organisations;
};

export const addUserToProjectService = async (body) => {
  const { user_id, project_id } = body;
  const addUserToProject = userProjectRepository.create({
    project_id: project_id,
    user_id: user_id,
  });
  await userProjectRepository.save(addUserToProject);
  return addUserToProject;
};

export const deleteUserFromProjectService = async (body) => {
  const { user_id } = body;
  const deleteUserFromProject = await projectRepository.delete({
    user_id: user_id,
  });

  return deleteUserFromProject;
};

export const createProjectService = async (body) => {
  const { name, creator_id } = body;

  const createProject = projectRepository.create({
    name: name,
    creator_id: creator_id,
  });
  await projectRepository.save(createProject);

  const project_id = createProject.id;

  const addToUserProject = userProjectRepository.create({
    project_id: project_id,
    user_id: creator_id,
  });
  await userProjectRepository.save(addToUserProject);

  return createProject;
};

export const deleteProjectService = async (id) => {
  await userProjectRepository.delete({ project_id: id });
  const deleteProject = await projectRepository.delete(id);
  return deleteProject;
};
