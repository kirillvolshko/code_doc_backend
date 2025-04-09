import { AppDataSource } from "../config/data-source.js";
import { User } from "../entities/User.js";
import { Notification } from "../entities/Notification.js";
import { UserProjects } from "../entities/UserProjects.js";
import { NotificationText } from "../config/notifications-texts.js";
const userRepository = AppDataSource.getRepository(User);
const notificationRepository = AppDataSource.getRepository(Notification);
const userProjectRepository = AppDataSource.getRepository(UserProjects);

export const createNotificationService = async (body, action) => {
  const { title, creator_id, project_id } = body;
  const actionUser = await userRepository.findOneBy({ id: creator_id });
  const users = await userProjectRepository.findBy({ project_id: project_id });

  const otherUsers = users.filter((user) => user.user_id !== creator_id);

  const createNotification = await otherUsers.map((user) =>
    notificationRepository.create({
      notification: NotificationText(action, actionUser, title),
      user_id: user.user_id,
      project_id: project_id,
    }),
  );
  await notificationRepository.save(createNotification);
};
