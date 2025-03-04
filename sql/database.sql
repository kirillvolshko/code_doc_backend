CREATE TABLE users(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);
CREATE TABLE organisation(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    creator_id VARCHAR(255),
    FOREIGN KEY (creator_id) REFERENCES users(id)
);
CREATE TABLE user_organisations(
    id SERIAL, 
    org_id VARCHAR(255),
    user_id VARCHAR(255),
    FOREIGN KEY (org_id) REFERENCES organisation(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE code_document(
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    creator_id VARCHAR(255),
    org_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    FOREIGN KEY (org_id) REFERENCES organisation(id),
    FOREIGN KEY (creator_id) REFERENCES users(id)
);
CREATE TABLE comments(
    id VARCHAR(255) PRIMARY KEY,
    creator_id VARCHAR(255),
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    doc_id VARCHAR(255),
    FOREIGN KEY (doc_id) REFERENCES code_document(id),
    FOREIGN KEY (creator_id) REFERENCES users(id)
);