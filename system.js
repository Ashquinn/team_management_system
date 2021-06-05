const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const roles = ['Sales Associate', 'Junior Sales Associate', 'Senior Sales Associate', 'Accountant', 'Junior Accountant', 'Senior Accountant', 'Financial Analyst', 'Financial Manager']
const roleDetails = {
    'Sales Associate':[1, 50000, 1],
    'Junior Sales Associate' :[2, 75000, 1], 
    'Senior Sales Associate': [3, 105000, 1],
    'Accountant': [4, 65000, 2], 
    'Junior Accountant': [5, 85000, 2], 
    'Senior Accountant': [6, 125000, 2], 
    'Financial Analyst': [7, 65000, 3], 
    'Financial Manager': [8, 70000, 3]
}

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
        };
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
        };
    });
};

//PARTIALLY WORKS
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: `What is the employee's first name?`,
            name: 'firstName'
        },
        {
            type: 'input',
            message: `What is the employee's last name?`,
            name: 'lastName'
        },
        {
            type: 'list',
            message: `What is the employee's role?`,
            name: 'role',
            choices: roles
        }
    ])
    .then((answer) => {
        connection.beginTransaction(function(err) {
            if (err) { throw err; }
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: roleDetails[answer.role][0]
                }
            ) 
            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.role,
                    salary: roleDetails[answer.role][1],
                    department_id: roleDetails[answer.role][2]
                }
            );
            connection.commit(function(err) {
                if (err) {
                  return connection.rollback(function() {
                    throw err;
                  });
                }
              });
        });
    });
    readEmployees();
}


connection.connect((err) => {
  if (err) throw err;
  runPrompt();
});

const exitApp = () => {
    connection.end();
  };