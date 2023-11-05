import { Subjects } from "./subjects";
import { OrderStatus } from "./types/order-status";

//We send min info that will be used by othre services
export interface OrderCancelledEvent {
  subject: Subjects.OrderCancelled;
  data: {
    id: string;
    version: number; 
    ticket: {
      id: string;
    };
  };
}
