-- creating the database --
CREATE DATABASE crudnodejsmysql;

-- usign the databas --
use crudnodejsmysql;

-- creating a table --
CREATE TABLE contact
(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    address VARCHAR(100) NOT NULL,
    phone VARCHAR(15)
);

-- show all tables --
SHOW TABLES;

-- to describe the table --
describe contact