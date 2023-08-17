import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error connecting to database";

  constructor() {
    super('Error connecting to db');   //For logging purposes 

    //Only because we are extending a built in class
    /*A built-in class in JavaScript is a class that is provided by the JavaScript engine itself.
     These classes are not defined by the user, but are instead part of the JavaScript language.*/
    //Built-in classes in JavaScript have a special prototype that is not accessible to the user.
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}