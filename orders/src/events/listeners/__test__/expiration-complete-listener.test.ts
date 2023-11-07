import { Message } from "node-nats-streaming";
import {
  ExpirationCompleteEvent,
  OrderStatus,
  TicketCreatedEvent,
} from "@srayen-tickets/common";
import mongoose from "mongoose";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";
import { ExpirationCompleteListener } from "../expiration-complete-listener";
import { Order } from "../../../models/order";

const setup = async () => {
  //create instance of the listener
  const listener = new ExpirationCompleteListener(natsWrapper.client);

  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();

  const order = Order.build({
    status: OrderStatus.Created,
    userId: "rayen123",
    expiresAt: new Date(), //in our case not important
    ticket,
  });
  await order.save();

  const data: ExpirationCompleteEvent["data"] = { orderId: order.id };

  //create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, order, ticket };
};

it("updates the order status to cancelled", async () => {
  const { listener, data, msg, order, ticket } = await setup();

  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder?.status).toEqual(OrderStatus.Cancelled);
});

it("emit on OrderCancelled event", async () => {
  const { listener, data, msg, order, ticket } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

    // console.log(natsWrapper.client.publish.mock.calls);
  const eventData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );
  expect(eventData.id).toEqual(order.id);
});

it("ack the message", async () => {
  const { listener, data, msg, order, ticket } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
