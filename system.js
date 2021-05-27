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

const runPrompt = () => {
    inquirer
    .prompt({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
            'View all employees',
            'View employees by department',
            'Add employee',
            'Update employee role',
            'Exit'
        ]
    })
    .then((answer) => {
        switch (answer.action) {
            case 'View all employees':
                readEmployees();
                break;

            case 'View employees by department':
                readDepartments();
                break;

            case 'Add employee':
                addEmployee();
                break;

            case 'Update employee role':
                updateEmployee();
                break;

            case 'Exit':
                exitApp();
                break;
        }
    });
};

const readEmployees = () => {
  console.log('Selecting all employees...\n');
  connection.query('SELECT * FROM employee INNER JOIN role ON role.id=employee.role_id INNER JOIN department ON department.id=role.department_id', (err, res) => {
    if (err) throw err;
    console.table(res);
    runPrompt();
  });
};

const readDepartments = () => {
    console.log('Selecting all departments...\n');
    connection.query('SELECT * FROM department', (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      runPrompt();
    });
  };



connection.connect((err) => {
  if (err) throw err;
  runPrompt();
});

const exitApp = () => {
    connection.end();
  };