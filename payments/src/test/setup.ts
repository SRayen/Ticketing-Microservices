import jwt from "jsonwebtoken";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

declare global {
  var signin: (id?: string) => string[];
}

//Trick:anything tries to import that filel =>JEST will redirect it to the file inside __mock__ directory
jest.mock("../nats-wrapper.ts");

//Insert Stripe API key 
//This key is from Stripe documentation (just for testing)
process.env.STRIPE_KEY = process.env.STRIPE_TESTING_KEY;

let mongo: any;
//This will starts before Testing ...

beforeAll(async () => {
  //reset mock function
  jest.clearAllMocks();
  process.env.JWT_KEY = "anything"; //This line to prevent The necessity of ENV var
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

global.signin = (id?: string) => {
  //Build a JWT payload. {id,email}
  const payload = {
    // id: "123test123",      Rq:in some tests we need to use 2 diff user in the same test (so we will generate a new id):
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };
  //Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  //Build session Object. {jwt: MY_JWT}
  const session = { jwt: token };
  //Turn that session into JSON
  const sessionJSON = JSON.stringify(session);
  //Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");
  //Return a string thats the cookie with encoded data
  // return [`express:sess=${base64}`];
  return [`session=${base64}`];
};
