import { queueGroupName } from "./queue-group-name";
import { Subjects, Listener, TicketCreatedEvent } from "@srayen-tickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price } = data;
    //Save a local ticket collection
    const ticket = Ticket.build({ id, title, price });
    await ticket.save();
    //Tell NATS that we have processed this thing fine
    msg.ack();
  }
}
