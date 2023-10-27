import {
  Publisher,
  Subjects,
  ExpirationCompleteEvent,
} from "@srayen-tickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
