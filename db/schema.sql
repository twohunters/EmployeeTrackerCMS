DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE departments (
id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10, 2) NOT NULL,
department_id INT,
PRIMARY KEY (id)
);

CREATE TABLE employees (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
PRIMARY KEY (id)
);

INSERT INTO department (department_name) VALUES
("Sales"),
("Advertising"),
("Engineering"),
("Production"),
("Legal");

INSERT INTO roles (title, salary, department_id) VALUES
("Sales Associate", 40000, 1),
("Graphic Designer", 50000, 2),
("Software Engineer", 60000, 3),
("Machinist/Operator", 60000, 4),
("HR Administrator", 60000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
("Marshall", "Ellington", 1, 1),
("Shantelle", "Gully", 2, 2),
("Isabell", "Grunberg", 3, 2),
("Young", "Warner", 4, 2),
("Jason", "Kim", 5, 1);