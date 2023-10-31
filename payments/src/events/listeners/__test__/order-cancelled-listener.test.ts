import { Message } from "node-nats-streaming";
import {
  OrderCancelledEvent,
  OrderCreatedEvent,
  OrderStatus,
} from "@srayen-tickets/common";
import { natsWrapper } from "../../../nats-wrapper";
import mongoose from "mongoose";
import { OrderCancelledListener } from "../order-cancelled-listener";
import { Order } from "../../../models/order";

const setup = async () => {
  //create an instance of the listener
  const listener = new OrderCancelledListener(natsWrapper.client);

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    price: 10,
    userId: "rayen123",
    version: 0,
  });
  await order.save();

  //create the fake data event
  const data: OrderCancelledEvent["data"] = {
    id: order.id,
    version: 1, //prev version + 1
    ticket: {
      id: "ticket 123",
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, order, msg };
};

it("updates the status of the order", async () => {
  const { listener, data, msg, order } = await setup();

  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder?.status).toEqual(OrderStatus.Cancelled);
});

it("acks the message", async () => {
  const { listener, data, msg, order } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
