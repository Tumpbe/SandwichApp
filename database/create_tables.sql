CREATE TYPE BreadType AS ENUM ('oat', 'rye', 'wheat');

CREATE TABLE IF NOT EXISTS sandwich (
  id SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  bread BreadType NOT NULL
);

CREATE TABLE IF NOT EXISTS "order" (
  id SERIAL PRIMARY KEY,
  sandwichId INT,
  "status" TEXT NOT NULL,
  FOREIGN KEY (sandwichId) REFERENCES sandwich(id)
);
