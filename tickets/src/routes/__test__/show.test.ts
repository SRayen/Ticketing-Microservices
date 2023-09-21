import request from "supertest"; //supertest : Allow us to fake a req to Express App
import { app } from "../../app";
import mongoose from "mongoose";


it("returns a 404 if the ticket is not found", async () => {
  //remember that before each test we delete all data
  //we will generate a real Id
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).post(`/api/tickets/${id}`).send().expect(404);
});

it("returns the ticket if the ticket is found", async () => {
  const title = "ray";
  const price = 99;
  //remember that before each test we delete all data
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price });
  expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
