import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

//scrypt function takes a long time to execute.
// To avoid this, we can convert the scrypt function to a promise using the promisify() function.
//promisify() function takes a synchronous function as an argument and returns a promise that resolves to the result of the synchronous function.
const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}`; //exp: 'azD45_5dz.123'
  }

  static async compare(storedPssword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPssword.split(".");
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString("hex") === hashedPassword;
  }
}