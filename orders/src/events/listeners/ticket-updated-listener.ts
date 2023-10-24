import { queueGroupName } from "./queue-group-name";
import {
  Subjects,
  Listener,
  TicketCreatedEvent,
  TicketUpdatedEvent,
} from "@srayen-tickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;
  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const ticket = await Ticket.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    const { title, price } = data;
    //update...
    //RQ:set() method in Mongoose is used to update the properties of a Mongoose document & we dont't need to use spreading
    //It will only update the specified fields
    ticket.set({ title, price });

    await ticket.save();

    //Tell NATS that we have processed this thing fine
    msg.ack();
  }
}
