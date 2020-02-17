// Here we define the Manager Class and export it

const Employee = require("./Employee");

class Manager extends Employee{
    constructor(name,id,Email,officeNumber){
        super(name,id,Email);

        this.officeNumber = officeNumber;
    }

    getRole(){
        return "Manager";
    }

    getOfficeNumber(){
        return this.officeNumber;
    }
}

module.exports = Manager;
