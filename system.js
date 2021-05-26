const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: 'root',

  password: '',
  database: 'systemDB',
});

// const readEmployees = () => {
//   console.log('Selecting all employees...\n');
//   connection.query('SELECT * FROM employee INNER JOIN role ON role.id=employee.role_id INNER JOIN department ON department.id=role.department_id', (err, res) => {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     console.table(res);
//     connection.end();
//   });
// };

// const readDepartments = () => {
//     console.log('Selecting all departments...\n');
//     connection.query('SELECT * FROM department', (err, res) => {
//       if (err) throw err;
//       // Log all results of the SELECT statement
//       console.table(res);
//       connection.end();
//     });
//   };

  const readRoles = () => {
  console.log('Selecting all roles...\n');
  connection.query('SELECT * FROM role INNER JOIN department ON department.id=role.department_id', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });
};

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  readRoles();
});