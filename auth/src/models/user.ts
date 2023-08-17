import mongoose from "mongoose";
import { Password } from "../services/password";

//interface describes props required to create a user
interface UserAttrs {
  email: string;
  password: string;
}

//interface describes props that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//interface describes props that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//done ~ await
//RQ: the use of function (not arrow fct is important) => to use 'this' refer t o the user document
userSchema.pre("save", async function (done) {
  //RQ 2 en 1 : case where the pass have been updated or case where the first time created => mongoose will consider password to be modified
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.password);
    this.set("password", hashed);
  }
  done()
});

//Add a function to a model in mongoose   (describes a single user)
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs); //standard method + .save()
};

// UserDoc interface describes the properties that a document in the User collection will have.
// UserModel interface describes the properties that a model in Mongoose will have.
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
