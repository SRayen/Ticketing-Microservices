import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters"); //For logging purposes

    //Only because we are extending a built in class
    /*A built-in class in JavaScript is a class that is provided by the JavaScript engine itself.
     These classes are not defined by the user, but are instead part of the JavaScript language.*/
    //Built-in classes in JavaScript have a special prototype that is not accessible to the user.
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      //RQ: The Extract utility type does not care about whether the property name is enclosed in quotes or not.
      type Results = Extract<typeof err, { path: string }>;
      const { path } = err as Results;
      return { message: err.msg, field: path };
    });
  }
}
