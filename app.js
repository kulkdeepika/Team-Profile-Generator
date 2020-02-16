const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");

const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const writeFileAsync = util.promisify(fs.writeFile);

const employees = [];
const CompanyRoles = {
    'Manager' : 'Enter the Office Number',
    'Engineer' : 'Enter the GitHub Username',
    'Intern' : 'Enter the school name'
}

// ​
// // Write code to use inquirer to gather information about the development team members,
// // and to create objects for each team member (using the correct classes as blueprints!)
// console.log("Create your Team Profile");

promptUser();

function promptUser(){
    inquirer.prompt([
        {
          type: "list",
          name: "role",
          message: "What is the role of the employee?",
          choices: [
              'Manager',
              'Engineer',
              'Intern'
          ]
        },  
      ])
      .then(function(roles) {
        let role = roles.role;
        inquirer.prompt([
              {
                type: "input",
                name: "name",
                message: "Enter the Employee Name"
              },
              {
                type: "input",
                name: "ID",
                message: "Enter the Employee ID"
              },
              {
                type: "input",
                name: "email",
                message: "Enter the Employee E-mail address"
              },
              {
                  type: "input",
                  name: "roleBasedAns",
                  message: `${CompanyRoles[role]}`
              }
        ]).then(function(answers){
    
            if(role === "Manager")
            {
                employees.push(new Manager(answers.name, answers.ID, answers.email,answers.roleBasedAns));
                console.log("Employee Array Successfully Created!")
                addMore(); 
            }
            else if(role === "Engineer")
            {
                employees.push(new Engineer(answers.name, answers.ID, answers.email,answers.roleBasedAns));
                console.log("Employee Array Successfully Created!")
                addMore();
            }
            else
            {
                employees.push(new Intern(answers.name, answers.ID, answers.email,answers.roleBasedAns));
                console.log("Employee Array Successfully Created!")
                addMore();
            }
    
        })
    
    })
     .catch(function(err) {
        console.log("RoleError" + err);
        console.log(err.response.status);
    });
}

const addMore = function(){
    inquirer.prompt([
        {
            type:"list",
            name:"oneMore",
            message: "Do you want to add more?",
            choices: [
                'Yes',
                'No'
            ]
        }
    ]).then(function(addNext){
        if(addNext.oneMore === "Yes")
        {
            promptUser();
        }
        else{
            const html = render(employees);
            return writeFileAsync(outputPath, html);
            console.log("Done!!");
            
        }
    });
}
// // After the user has input all employees desired, call the `render` function (required
// // above) and pass in an array containing all employee objects; the `render` function will
// // generate and return a block of HTML including templated divs for each employee!

//const html = render(employees);

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
// for the provided `render` function to work!```
