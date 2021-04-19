const inquirer = require("inquirer");
const connection = require("./config/connection");
const consoleTable = require("console.table");

const init = () => {
    console.log("Welcome to Employee Tracker CMS")
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
    })
        .then(response => {
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
                    console.log("Thanks for using Employee Tracker CMS")
                    connection.end();
                    break;
            };
        });
};

const addDepartment = () => {
    inquirer.prompt([{
        type: "input",
        name: "department_name",
        message: "What is the name of the new department?"
    }])
        .then(answer => {
            connection.query("INSERT INTO departments SET ?", {
                department_name: answer.department_name
            }, (err, res) => {
                if (err) throw err
                console.table(res);
                init();
            })
        })
};

const addRole = () => {
    connection.query("SELECT * FROM departments", (err, departmentList) => {
        let departments = departmentList.map(({ id, department_name }) => ({ value: id, name: department_name }));

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
            type: "list",
            name: "department_id",
            message: "Which department does this role belong to?",
            choices: departments
        }])
            .then(answer => {
                connection.query("INSERT INTO roles SET ?", {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id,
                }, (err, res) => {
                    if (err) throw err
                    console.table(res);
                    init();
                })
            })
    })
};

const addEmployee = () => {
    connection.query("SELECT * FROM roles", (err, roleList) => {
        let roles = roleList.map(({ id, title }) => ({ value: id, name: title }));

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
            type: "list",
            name: "role_id",
            message: "What is the employee's ID?",
            choices: roles
        },
        {
            type: "list",
            name: "manager_id",
            message: "What is the manager's ID?",
            choices: roles
        }])
            .then(answer => {
                connection.query("INSERT INTO employees SET ?", {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
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
    connection.query("SELECT * FROM employees", (err, employeeList) => {
        let employees = employeeList.map(({ id, first_name, last_name }) => ({ value: id, name: first_name + last_name }));

        inquirer.prompt({
            type: "list",
            name: "employee",
            message: "Which employee would you like to update?",
            choices: employees
        })
            .then(pick => {
                connection.query("SELECT * FROM roles", (err, roleList) => {
                    let roles = roleList.map(({ id, title }) => ({ value: id, name: title }));

                    inquirer.prompt({
                        type: "list",
                        name: "role",
                        message: "What is their new role?",
                        choices: roles
                    })
                        .then(update => {
                            connection.query("UPDATE employees SET role_id = ? WHERE id = ?", [update.role, pick.employee], (err, res) => {
                                if (err) throw err;
                                console.table(res);
                                init();
                            });
                        });
                });
            });
    });
};

connection.connect(err => {
    if (err) throw err;
    init();
});