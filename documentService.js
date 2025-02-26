import documentCode from "./DocumentCode.js";

export const createDocumentService = async (document) => {
  const createDocument = await documentCode.create(document);
  return createDocument;
};

export const getDocumentByIdService = async (id) => {
  if (!id) {
    throw new Error("Dont have ID");
  }
  const getOneDocument = await documentCode.findById(id);
  return getOneDocument;
};
export const patchDocumentService = async (id, document) => {
  if (!id) {
    throw new Error("Dont have ID");
  }
  const updateDocument = await documentCode.findByIdAndUpdate(
    id,
    {
      $set: document,
    },
    { new: true }
  );

  return updateDocument;
};
export const deleteDocumentByIdService = async (id) => {
  if (!id) {
    throw new Error("Dont have ID");
  }
  const deleteDocument = await documentCode.findByIdAndDelete(id, {
    new: true,
  });
  return deleteDocument;
};
