import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}
/*<T extends Event> syntax is a generic type constraint (Listener class can only be extended by classes that provide a type 
  argument for T that is a subclass of Event) */
//When we try to extend from this class => We should provide some custom type to this generic type (like an argument for types)
export abstract class Listener<T extends Event> {
  private client: Stan;
  abstract subject: T["subject"]; //channel

  abstract queueGroupName: string;
  protected ackWait = 5 * 1000;
  abstract onMessage(data: T["data"], msg: Message): void;

  constructor(client: Stan) {
    this.client = client;
  }
  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait) //default 30s
      .setDurableName(this.queueGroupName); //we will use 'queueGroupName'  as a queue & durable name
  }
  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );
    subscription.on("message", (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);
      const parseData = this.parseMessage(msg);
      this.onMessage(parseData, msg);
    });
  }
  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}
