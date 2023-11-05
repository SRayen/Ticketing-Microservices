import { Subjects } from "./subjects";
import { OrderStatus } from "./types/order-status";

//We send min info that will be used by othre services
export interface ExpirationCompleteEvent {
  subject: Subjects.ExpirationComplete;
  data: {
    orderId: string;
  };
}
