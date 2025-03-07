import db from "../config/db.js";

export const getDocumentsService = async (id) => {
  const getDocument = await db.query(
    `SELECT 
       code_document.*, 
       users.id AS user_id, 
       users.name, 
       users.email
     FROM 
       code_document
     JOIN 
       users ON code_document.creator_id = users.id
     WHERE 
       code_document.id = $1`,
    [id]
  );
  const document = getDocument.rows[0];
  return {
    id: document.id,
    title: document.title,
    content: document.content,
    creator: {
      id: document.user_id,
      name: document.name,
      email: document.email,
    },
    created_at: document.created_at,
    updated_at: document.updated_at,
  };
};

export const createDocumentService = async (body) => {
  const { title, content, creator_id, org_id } = body;
  const createDocument = await db.query(
    `INSERT INTO code_document(title, content, creator_id, org_id) values ($1, $2, $3, $4)`,
    [title, content, creator_id, org_id]
  );
  return createDocument;
};

export const updateDocumentService = async (body, id) => {
  const { title, content, updated_id } = body;
  const updatedAt = new Date();
  const updateDocument = await db.query(
    `UPDATE code_document set title = $1, 
         content = $2, 
         updated_id = $3, 
         updated_at = $4 
     WHERE id = $5 `,
    [title, content, updated_id, updatedAt, id]
  );
  return updateDocument;
};

export const deleteDocumentService = async (id) => {
  const deleteDocument = await db.query(
    `DELETE FROM code_document where id=$1`,
    [id]
  );
  return deleteDocument;
};
