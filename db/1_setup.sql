-- 1_setup.sql
DROP TABLE IF EXISTS pokemon;

CREATE TABLE pokemon (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    type varchar(255) NOT NULL
);