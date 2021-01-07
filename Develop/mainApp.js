const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
function employeeManager() {
    console.log("Please build your team");
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "Please enter your manager's name.",
            validate: function (answer) {
              if (answer !== "") {
                return true;
              }
                return "Please enter at least one character.";
            }
          },
        {
            type: "input",
            name: "managerId",
            message: "Please enter your manager's id.",
            validate: function (answer) {
              if (!isNaN(answer) && answer > 0) {
                return true;
              }
                return "Please enter a valid number greater than zero.";
            }
        },
        {
            type: "input",
            name: "managerEmail",
            message: "Please enter your manager's email.",
            validate: function (answer) {
              if (answer.indexOf("@") >= 0) {
                return true;
              }
                return "Please enter a valid email address.";
            }
        },
        {
            type: "input",
            name: "managerOfficenumber",
            message: "Please enter your manager's office number.",
            validate: function (answer) {
              if (!isNaN(answer) && answer > 0) {
                return true;
              }
                return "Please enter a valid office number greater than zero.";
            }
        }
    ]).then(answers => {
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficenumber);
        console.log(JSON.stringify(manager))
    })
}

employeeManager();


// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```