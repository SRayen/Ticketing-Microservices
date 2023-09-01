import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

let mongo: any;
//THIS will starts before Testing ...

beforeAll(async () => {
  process.env.JWT_KEY = "anything"; //This line to prevent THe necessity of ENV var
  const mongo = new MongoMemoryServer();
  await mongo.start(); //Start the MongoDB instance
  const mongoUri = await mongo.getUri(); //Get URL to connect to it
  await mongoose.connect(mongoUri);
});

//THIS will starts before each Test ...
beforeEach(async () => {
  //We will reach into this MongoDB DB & delete / reset all the data inside there
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({}); //delete All Docs
  }
});

//THIS will starts after All Tests ...
afterAll(async () => {
  await mongo?.stop();
  await mongoose.connection.close();
});
