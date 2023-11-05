import { Subjects } from "./subjects";
import { OrderStatus } from "./types/order-status";

//We send min info that will be used by other services
export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    version: number;
    status: OrderStatus;
    userId: string;
    expiresAt: string;
    ticket: {
      id: string;
      price: number;
    };
  };
}
 
