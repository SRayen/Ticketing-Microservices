import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Listener, OrderCancelledEvent, OrderCreatedEvent, Subjects } from "@srayen-tickets/common";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher ";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {

    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new Error("Ticket is not found");
    }
 
    ticket.set({ orderId: undefined}); //id of created order
    //Save the ticket
    await ticket.save();
    //RQ: here we are publishing an Event from inside of our listener !
    //we need to publish all updates to conserve versioning
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });
    //Ack the message
    msg.ack();
  }
}
