const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const teamId = [];
const teamMembers = [];

const render = require("./lib/htmlRenderer");

employeeTeam = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "chooseMembers",
            message: "Please specify your choice of team members.",
            choices: [
            "Engineer",
            "Intern",
            "I am finished choosing team members."
            ]
        }
        ]).then(selection => {
        if (selection.chooseMembers === "Engineer") {
            createEngineer();
        } else if (selection.chooseMembers === "Intern") {
            createIntern();
        } else {
            createyourTeam();
        }
    });
}
employeeManager = () => {
    console.log("Please build your team");
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "Please enter your manager's name.",
            validate: function (answer) {
              if (answer.length > 0) {
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
              if (answer.match(/\S+@\S+\.\S+/)) {
                return true;
              } else {
                return "Please enter a valid email address.";
              }
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
        teamId.push(answers.managerId);
        teamMembers.push(manager);
        console.log(JSON.stringify(teamId))
        employeeTeam();
    })
}
createEngineer = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "Please enter your engineer's name",
            validate: function (answer) {
            if (answer.length > 0) {
                return true;
            }
                return "Please enter a valid name with at least one character.";
            }
        },
        {
            type: "input",
            name: "engineerId",
            message: "Please enter your engineer's id.",
            validate: function (answer) {
              if (!isNaN(answer) && answer > 0) {
                return true;
              }
                return "Please enter a valid number greater than zero.";
            }
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "Please enter your engineer's email.",
            validate: function (answer) {
              if (answer.match(/\S+@\S+\.\S+/)) {
                return true;
              } else {
                return "Please enter a valid email address.";
              }
            }
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is your engineer's GitHub username?",
            validate: answer => {
              if (answer.length > 0) {
                return true;
              }
              return "Please enter a valid GitHub username with at least one character.";
            }
        }
    ]).then(answers => {
        const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
        teamId.push(answers.engineerId);
        teamMembers.push(engineer);
        console.log(JSON.stringify(teamId))
        employeeTeam();
    })
}
createIntern = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "Please enter your intern's name",
            validate: function (answer) {
            if (answer.length > 0) {
                return true;
            }
                return "Please enter a valid name with at least one character.";
            }
        },
        {
            type: "input",
            name: "internId",
            message: "Please enter your intern's id.",
            validate: function (answer) {
              if (!isNaN(answer) && answer > 0) {
                return true;
              }
                return "Please enter a valid number greater than zero.";
            }
        },
        {
            type: "input",
            name: "internEmail",
            message: "Please enter your engineer's email.",
            validate: function (answer) {
              if (answer.match(/\S+@\S+\.\S+/)) {
                return true;
              } else {
                return "Please enter a valid email address.";
              }
            }
        },
        {
            type: "input",
            name: "internSchool",
            message: "Please enter your intern's school.",
            validate: answer => {
              if (answer.length > 0) {
                return true;
              }
              return "Please enter a valid school with at least one character.";
            }
        }
    ]).then(answers => {
        const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
        teamId.push(answers.internId);
        teamMembers.push(intern);
        console.log(JSON.stringify(teamId))
        employeeTeam();
    })
}

createyourTeam = () => {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
      }
      fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
}

employeeManager();
