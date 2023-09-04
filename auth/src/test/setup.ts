import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";

declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>;
    }
  }
}

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

global.signin = async () => {
  const email = "test@test.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  // Set-Cookie header is an HTTP header that is used to send cookies from the server to the client
  const cookie = response.get("Set-Cookie");

  return cookie;
};
