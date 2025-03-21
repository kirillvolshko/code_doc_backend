export const documentDto = (comment, user) => {
  return {
    id: comment.id,
    content: comment.content,
    creator: {
      id: user.id,
      name: user.name,
    },
    created_at: comment.created_at,
    doc_id: comment.doc_id,
  };
};
