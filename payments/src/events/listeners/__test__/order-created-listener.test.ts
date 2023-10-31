import { Message } from "node-nats-streaming";
import { OrderCreatedEvent, OrderStatus } from "@srayen-tickets/common";
import { natsWrapper } from "../../../nats-wrapper";
import mongoose from "mongoose";
import { OrderCreatedListener } from "../order-created-listener";
import { Order } from "../../../models/order";

const setup = async () => {
  //create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  //create the fake data event
  const data: OrderCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: "rayen123",
    expiresAt: "test",
    ticket: {
      id: "ticket123",
      price: 10,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("replicats the order info", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const order = await Order.findById(data.id);

  expect(order?.price).toEqual(data.ticket.price);
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});