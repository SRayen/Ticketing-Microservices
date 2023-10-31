import { Publisher, Subjects, PaymentCreatedEvent } from "@srayen-tickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
