export const NotificationText = (action, name, fileName) => {
  const variants = {
    ["create"]: name + " create file " + fileName,
    ["update"]: name + " update file " + fileName,
    ["delete"]: name + " delete file " + fileName,
    ["add-com"]: name + " add comment to file " + fileName,
  };
  return variants[action];
};
