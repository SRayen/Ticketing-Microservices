import { Publisher, Subjects, OrderCreatedEvent } from "@srayen-tickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
