import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@srayen-tickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
