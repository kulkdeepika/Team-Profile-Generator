// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee{
    constructor(name,id,Email,GitHubUser){
        super(name,id,Email);
        this.github = GitHubUser;      
    }

    getRole(){
        return "Engineer";
    }

    getGithub(){
        return this.github;
    }
}

module.exports = Engineer;