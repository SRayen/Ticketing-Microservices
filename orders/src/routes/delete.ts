import {
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
} from "@srayen-tickets/common";
import express, { Request, Response } from "express";
import { Order } from "../models/order";

const router = express.Router();
//Here we mean by delete Order ===>update OrderStatus to 'Cancelled'

router.delete(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    //Publishing an event saying this was cancelled!

    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
