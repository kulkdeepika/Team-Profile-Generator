// Here we define the Employee Class and export it

class Employee{
    constructor(name,id,Email){
        this.name = name;
        this.id = id;
        this.email = Email
    }

    getName(){
        return this.name;
    }

    getId(){
        return this.id;
    }

    getEmail(){
        return this.email;
    }

    getRole(){
        return "Employee"
    }
}

module.exports = Employee;

