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
//Switch statement which will direct the user to a different function based upon their initial response
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

//This simple block will read all the employees in the database and include their first and last name, role, salary, and department.
const readEmployees = () => {
  console.log('Selecting all employees...\n');
  connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name FROM employee LEFT JOIN role ON role.id=employee.role_id LEFT JOIN department ON department.id=role.department_id', (err, res) => {
    if (err) throw err;
    console.table(res);
    runPrompt();
  });
};

//The following block of call will render all employees based upon thier department. A switch statement is used to direct to the different departments. 
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

//Here the user will be able to an employee. The user will enter thier first and last name and the employee role. The new employee will then be added to the database accordingly.
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
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: roleDetails[answer.role][0]
                }
            )
        readEmployees(); 
    });
}

//This following block of code will allow the user to update any employee's role.
const updateEmployee = () => {
    connection.query(
        'SELECT employee.first_name, employee.last_name FROM employee',
        function (err, res) {
            if (err) throw err
            res.forEach(person => {
                peopleArray.push(person.first_name + " " + person.last_name)
            });
            inquirer.prompt([
                {
                    type: 'list',
                    message: `Which employee do you want to update?`,
                    name: 'employee',
                    choices: peopleArray
                },
                {
                    type: 'list',
                    message: `What is the employee's new role?`,
                    name: 'role',
                    choices: roles
                }
            ])
            .then((answer) => {
                let firstName = answer.employee.split(" ")[0]
                let lastName = answer.employee.split(" ")[1]
                connection.query(
                    'UPDATE employee SET ? WHERE ? and ?', [
                        {
                            role_id: roleDetails[answer.role][0]
                        },
                        {
                            first_name: firstName
                        },
                        {
                            last_name: lastName
                        }
                    ], (err,res) => {
                        if (err) throw err
                    }
                    
                )
                readEmployees();
        })
    });
}

//Initializes the beginning prompt upon launch.
connection.connect((err) => {
  if (err) throw err;
  runPrompt();
});

//Exits and ends the connection.
const exitApp = () => {
    connection.end();
  };