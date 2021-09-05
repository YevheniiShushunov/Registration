CREATE TABLE user (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR (40) UNIQUE ,
    login VARCHAR (20),
    real_name VARCHAR(40),
    password VARCHAR(80),
    birth_date DATE,
    country VARCHAR(40),
    registration TIMESTAMP,
    agree_condition BOOLEAN DEFAULT false
)

CREATE TABLE country (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR (40) NOT NULL UNIQUE
)