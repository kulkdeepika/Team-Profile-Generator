// Here we define the Intern Class and export it

const Employee = require("./Employee");

class Intern extends Employee{
    constructor(name,id,Email,school){
        super(name,id,Email)

        this.school = school;
    }

    getRole(){
        return "Intern";
    }

    getSchool(){
        return this.school;
    }
}

module.exports = Intern;