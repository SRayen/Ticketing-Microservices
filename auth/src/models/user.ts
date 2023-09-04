import mongoose from "mongoose";
import { Password } from "../services/password";

//RQ: We must create interface for record & interface for Document:
//UserAttrs is the set of properties required to build a record => after the creation it will be turn into a document
//That document (UserDoc) might have some additional properties placed on it automatically by mongoose, exp: createAt

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

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },

  {
    //manipulate the JSON representation
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

//done ~ await
//RQ: the use of function (not arrow fct is important) => to use 'this' refer t o the user document
userSchema.pre("save", async function (done) {
  //RQ 2 en 1 : case where the pass have been updated or case where the first time created => mongoose will consider password to be modified
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.password);
    this.set("password", hashed);
  }
  done();
});

//Add a function to a model in mongoose   (describes a single user)
//The role of build fct here is to allow TS to do some validation
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs); //standard method + .save()
};
//User Model:
//The UserDoc type is the type of the document that will be stored in the database.
//The UserModel type is the type of the model object that is returned by the mongoose.model() function.
//1er param: name of the model
//2nd param:schema for the model
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };