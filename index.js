const inquirer = require("inquirer");
const connection = require("./config/connection");
const consoleTable = require("console.table");

const init = () => {
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
                connection.end();
                break;
        };
    });
};

const addDepartment = () => {

};

const addRole = () => {
    
};

const addEmployee = () => {
    
};

const viewDepartments = () => {
    
};

const viewRoles = () => {
    
};

const viewEmployees = () => {
    
};

const updateEmployeeRoles = () => {

};

connection.connect(err => {
    if (err) throw err;
    init();
});