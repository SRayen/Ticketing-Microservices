import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@srayen-tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
   readonly subject= Subjects.TicketCreated; 
}