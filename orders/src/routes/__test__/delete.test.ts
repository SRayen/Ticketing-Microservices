import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { Order, OrderStatus } from "../../models/order";

it("marks an order as cancelled", async () => {
  //Create a ticket
  const ticket = Ticket.build({ title: "test", price: 15 });
  await ticket.save();

  const user = global.signin();

  //Make a request to build an order with this ticket

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  //Make request to cancel the order
  const { body: fetchOrder } = await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  //Expectation to make sure the thing is cancelled
  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it.todo("emits an order cancelled event");
