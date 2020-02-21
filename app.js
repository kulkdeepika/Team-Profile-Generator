//This file is the entry point to the application. It contains functions
//to prompt the appropriate questions to the user, process the input
//and make a call to a function that will use this input to generate the html 

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const chalk = require("chalk");

const path = require("path");
const fs = require("fs");
const util = require("util");

const dir = './output';

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const writeFileAsync = util.promisify(fs.writeFile);

// Create an empty array to hold all the <div>s of the Employees
const employees = [];
//To ask the appropriate question based on the role, store it as a key-val pair
const CompanyRoles = {
    'Manager' : 'Enter the Office Number',
    'Engineer' : 'Enter the GitHub Username',
    'Intern' : 'Enter the school name'
}

console.log(chalk.green("\n*** Welcome to Team Profile Generator ***\n"));

async function promptUser(){

    try{
        var roles = await inquirer.prompt([
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
          ]);
    
        let role = roles.role;
    
        var answers = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the Employee Name",
            validate: function(val) {
                // The users must enter a name
                let isValid = val === "" ? false : true;
                if(!isValid)
                {
                    console.log(chalk.red("\n*** Must enter a name! ***\n")); 
                }
                return isValid;
            }
        },
        {
            type: "input",
            name: "ID",
            message: "Enter the Employee ID",
            validate: function(val) {
                // The users must enter a ID
                let isValid = val === "" ? false : true;
                if(!isValid)
                {
                    console.log(chalk.red("\n*** Must enter a EmployeeID! ***\n")); 
                }
                return isValid;
            }
        },
        {
            type: "input",
            name: "email",
            message: "Enter the Employee E-mail address",
            validate: function(val) {
                // The users must enter a valid email format
                let isValid = /.+@.+\..+/gi.test(val);
                if(!isValid)
                {
                    console.log(chalk.red("\n*** Must enter a valid format! ***\n")); 
                }
                return isValid;
            }
        },
        {
            type: "input",
            name: "roleBasedAns",
            message: `${CompanyRoles[role]}`,
            validate: function(val) {
                // The users must enter a non-null value
                let isValid = val === "" ? false : true;
                if(!isValid)
                {
                    console.log(chalk.red("\n*** Must enter non-empty value! ***\n")); 
                }
                return isValid;
            }
        }
      ])
    
       //Here we create either manager, engineer or intern object depending on the user input and add it to the employee array
       if(role === "Manager")
       {
           employees.push(new Manager(answers.name, answers.ID, answers.email,answers.roleBasedAns));
           console.log(chalk.green("\n*** Employee successfully added ***\n"));
           addMore(); 
       }
       else if(role === "Engineer")
       {
           employees.push(new Engineer(answers.name, answers.ID, answers.email,answers.roleBasedAns));
           console.log(chalk.green("\n*** Employee successfully added ***\n"));
           addMore();
       }
       else
       {
           employees.push(new Intern(answers.name, answers.ID, answers.email,answers.roleBasedAns));
           console.log(chalk.green("\n*** Employee successfully added ***\n"));
           addMore();
       }
    }
    catch{

        console.log(chalk.red("\n*** Something went wrong. Please try again. ***\n"));
        console.log(err);
        console.log(err.response.status);
    }

}

//If the user wants to add more employees, take the inputs, otherwise, pass the employee array to a function that will generate the html

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
            
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }

            const html = render(employees);
            console.log(chalk.green("\n*** Please find your file in the 'output' folder ***\n"));
            return writeFileAsync(outputPath, html);            
        }
    })
    .catch(function(err) {
        console.log(chalk.red("\n*** Something went wrong. Please try again. ***\n"));
        console.log(err);
        console.log(err.response.status);
    });

}
//fire the questions
promptUser();
