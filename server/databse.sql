CREATE TABLE user (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR (20) UNIQUE ,
    login VARCHAR (20),
    real_name VARCHAR(20),
    password VARCHAR(20),
    birth_date DATE,
    county_name VARCHAR(40),
    registration TIMESTAMP,
    agree_condition BOOLEAN DEFAULT fals;
    FOREIGN KEY county_name REFERENCES country(name)
)

CREATE TABLE country (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR (40) NOT NULL UNIQUE
)