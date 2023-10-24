import request from "supertest";

import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import mongoose from "mongoose";

const buildTicket = async () => {
  const ticket = Ticket.build({id:new mongoose.Types.ObjectId().toHexString(), title: "test", price: 15 });
  await ticket.save();
  return ticket;
};

it("fetches ordes for particular user", async () => {
  //Create 3 tickets:
  const ticket1 = await buildTicket();
  const ticket2 = await buildTicket();
  const ticket3 = await buildTicket();

  const user1 = global.signin();
  const user2 = global.signin();
  //Create 1 order as User #1
  await request(app)
    .post("/api/orders")
    .set("Cookie", user1)
    .send({ ticketId: ticket1.id })
    .expect(201);

  //Create 2 orders as User #2
  //we have renamed the body to order1
  const { body: order1 } = await request(app)
    .post("/api/orders")
    .set("Cookie", user2)
    .send({ ticketId: ticket2.id })
    .expect(201);
  //we have renamed the body to order2
  const { body: order2 } = await request(app)
    .post("/api/orders") 
    .set("Cookie", user2)
    .send({ ticketId: ticket3.id })
    .expect(201);

  //Make request to get orders for user #2
  const response = await request(app)
    .get("/api/orders")
    .set("Cookie", user2)
    .expect(200);
  //Make sure we only got the ordes for User #2
  console.log("====>", response.body);
  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toEqual(order1.id);
  expect(response.body[1].id).toEqual(order2.id);
  expect(response.body[0].ticket.id).toEqual(ticket2.id);
  expect(response.body[1].ticket.id).toEqual(ticket3.id);
});
  