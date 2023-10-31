import { queueGroupName } from "./queue-group-name";
import {
  Subjects,
  Listener,
  ExpirationCompleteEvent,
  OrderStatus,
} from "@srayen-tickets/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
  queueGroupName = queueGroupName;
  async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId).populate("ticket");
    if (!order) {
      throw new Error("Order not found");
    }
    //Case when we receive a cancellation event around an order that has already been paid for (status: Complete):
    if (order.status === OrderStatus.Complete) {
      return msg.ack();
    }
    order.set({
      status: OrderStatus.Cancelled,
      //RQ:we don't need to reset/clear out this ticket property, isReserved() (in Ticket Model) will do the trick
    });
    await order.save();
    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: { id: order.ticket.id },
    });
    //Tell NATS that we have processed this thing fine
    msg.ack();
  }
}
