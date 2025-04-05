export const userDto = (model) => {
  return {
    id: model.id,
    email: model.email,
  };
};
export const creatorDto = (model) => {
  return {
    id: model.id,
    name: model.name,
    email: model.email,
  };
};
