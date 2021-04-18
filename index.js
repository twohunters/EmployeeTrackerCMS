const inquirer = require("inquirer");
const connection = require("./config/connection");
const consoleTable = require("console.table");

const init = () => {
    console.log("Welcome to the employee tracker")
    inquirer.prompt({
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: [
            "Add department",
            "Add role",
            "Add employee",
            "View departments",
            "View roles",
            "View employees",
            "Update employee roles",
            "Exit"
        ]
    }).then(response => {
        switch (response.choices) {
            case "Add department":
                addDepartment();
                break;
            case "Add role":
                addRole();
                break;
            case "Add employee":
                addEmployee();
                break;
            case "View departments":
                viewDepartments();
                break;
            case "View roles":
                viewRoles();
                break;
            case "View employees":
                viewEmployees();
                break;
            case "Update employee roles":
                updateEmployeeRoles();
                break;
            case "Exit":
                console.log("Thanks for using the employee tracker")
                connection.end();
                break;
        };
    });
};

const addDepartment = () => {
    inquirer.prompt([{
        type: "input",
        name: "name",
        message: "What is the name of the new department?"
    }])
        .then(answer => {
            connection.query("INSERT INTO departments SET ?", {
                name: answer.name
            }, (err, res) => {
                if (err) throw err
                console.table(res);
                init();
            })
        })
};

const addRole = () => {
    inquirer.prompt([{
        type: "input",
        name: "title",
        message: "What is the title of the new role?"
    },
    {
        type: "input",
        name: "salary",
        message: "What is the annual salary?"
    },
    {
        type: "input",
        name: "department",
        message: "Which department does this role belong to?",
        choices // build a list that links with schema
    }])
        .then(answer => {
            connection.query("INSERT INTO roles SET ?", {
                title: answer.title,
                salary: answer.salary,
                department: answer.department,
            }, (err, res) => {
                if (err) throw err
                console.table(res);
                init();
            })
        })
};

const addEmployee = () => {
    connection.query("SELECT * FROM employees", (err, res) => {
        if (err) throw err;

        inquirer.prompt([{
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?",
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?",
        },
        {
            type: "input",
            name: "role_id",
            message: "What is the employee's ID?",
        },
        {
            type: "input",
            name: "manager_id",
            message: "What is the manager's ID?",
        }])
            .then(answer => {
                connection.query("INSERT INTO employees SET ?", {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.last_name,
                    manager_id: answer.manager_id
                }, (err, res) => {
                    if (err) throw err
                    console.table(res);
                    init();
                })
            })
    })
};

const viewDepartments = () => {
    connection.query("SELECT * FROM departments", (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

const viewRoles = () => {
    connection.query("SELECT * FROM roles", (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

const viewEmployees = () => {
    connection.query("SELECT * FROM employees", (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

const updateEmployeeRoles = () => {
    let employees = [];
    let roles = []; // fill in brackets

    inquirer.prompt({
        type: "list",
        name: "updateEmployee",
        message: "Which employee would you like to update?",
        choices: employees
    })
    .then(answer => {
        connection.query("SELECT * FROM roles", (err, res) => {
            if (err) throw err;
            inquirer.prompt({
                type: "list",
                name: "updateRole",
                message: "What role would you like to update?",
                choices: roles
            })
            .then(newRole => {
                connection.query("UPDATE employees SET role_id + ? WHERE id = ?", [newRole.updateRole, answer.updateEmployee], (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    init();
                });
            });
        });
    });
};

connection.connect(err => {
    if (err) throw err;
    init();
});