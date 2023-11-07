import { Message } from "node-nats-streaming";
import { Listener, OrderCreatedEvent, Subjects } from "@srayen-tickets/common";
import { queueGroupName } from "./queue-group-name";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log("waiting this many milliseconds to process the job", delay);
    await expirationQueue.add({ orderId: data.id }, { delay });
    msg.ack();
  }
}


/* RQ:
The expirationQueue.add() method is used to add a job to the expiration queue in Bull.js
In our case, we are passing an object with two properties:
1. orderId: The id of the created order
2. delay: The time until the job should be processed (in milliseconds)
*/