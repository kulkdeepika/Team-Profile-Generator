// Here we define the Engineer Class and export it

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