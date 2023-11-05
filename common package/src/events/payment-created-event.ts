import { Subjects } from "./subjects";
import { OrderStatus } from "./types/order-status";

//We send min info that will be used by other services
export interface PaymentCreatedEvent {
  subject: Subjects.PaymentCreated;
  data: {
    id: string;
    orderId: string;
    stripeId: string;
  };
}
