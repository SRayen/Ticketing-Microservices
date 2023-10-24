import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Listener, OrderCreatedEvent, Subjects } from "@srayen-tickets/common";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher ";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    //Find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);
    //If no ticket, throw an error
    if (!ticket) {
      throw new Error("Ticket is not found");
    }
    //Mark he ticket as being reserved by setting its orderId property
    ticket.set({ orderId: data.id }); //id of created order
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
