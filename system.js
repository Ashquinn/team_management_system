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
  connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name FROM employee LEFT JOIN role ON role.id=employee.role_id LEFT JOIN department ON department.id=role.department_id', (err, res) => {
    if (err) throw err;
    console.table(res);
    runPrompt();
  });
};

const readDepartments = () => {
    inquirer
    .prompt({
        name: 'department',
        type: 'rawlist',
        message: 'What department do you want to look up?',
        choices: [
            'Sales',
            'Accounting',
            'Finance'
        ]
    })
    .then((answer) => {
        switch (answer.department) {
            case 'Sales':
                console.log('Selecting all employees in Sales...\n');
                connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name FROM employee LEFT JOIN role ON role.id=employee.role_id LEFT JOIN department ON department.id=role.department_id WHERE ?',
                {
                    department_name: 'Sales'
                }, (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    runPrompt();
                });
                break;

            case 'Accounting':
                console.log('Selecting all employees in Sales...\n');
                connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name FROM employee LEFT JOIN role ON role.id=employee.role_id LEFT JOIN department ON department.id=role.department_id WHERE ?',
                {
                    department_name: 'Accounting'
                }, (err, res) => {
                    if (err) throw err;
                console.table(res);
                runPrompt();
                });
                break;
            
            case 'Finance':
                console.log('Selecting all employees in Sales...\n');
                connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name FROM employee LEFT JOIN role ON role.id=employee.role_id LEFT JOIN department ON department.id=role.department_id WHERE ?',
                {
                    department_name: 'Finance'
                }, (err, res) => {
                    if (err) throw err;
                console.table(res);
                runPrompt();
                });
                break;
        }
    })
}



connection.connect((err) => {
  if (err) throw err;
  runPrompt();
});

const exitApp = () => {
    connection.end();
  };