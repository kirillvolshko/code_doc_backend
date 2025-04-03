export const documentDto = (documentModel, user) => {
  return {
    id: documentModel.id,
    title: documentModel.title,
    content: documentModel.content,
    creator: {
      id: user.id,
      name: user.name,
    },
    org_id: documentModel.org_id,
    created_at: documentModel.created_at,
    updated_at: documentModel.updated_at,
    updated_id: documentModel.updated_id,
  };
};

export const documentsDto = (documentModel) => {
  return {
    id: documentModel.id,
    title: documentModel.title,
  };
};
