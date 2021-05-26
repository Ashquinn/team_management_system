USE systemDB;


INSERT INTO department (department_name)
VALUES ("Sales");

INSERT INTO department (department_name)
VALUES ("Accounting");

INSERT INTO department (department_name)
VALUES ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Associate", "50000", 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Junior Sales Associate", "75000", 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Senior Sales Associate", "105000", 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", "65000", 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Junior Accountant", "85000", 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Senior Accountant", "125000", 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Financial Analyst", "65000", 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Financial Manager", "70000", 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Chief Financial Officer", "250000", 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Miriam", "Williams", 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Tamia", "Perry", 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Julian", "Livingston", 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Diamond", "Bigelow", 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Amber", "Anderson", 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Joseph", "Williams", 6);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Zach", "Snead", 7);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Timothy", "O'connor", 8);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Imani", "Jackson", 9);