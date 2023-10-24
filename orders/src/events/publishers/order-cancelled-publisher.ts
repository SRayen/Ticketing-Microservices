import {
  Publisher,
  Subjects,
  OrderCancelledEvent,
} from "@srayen-tickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}