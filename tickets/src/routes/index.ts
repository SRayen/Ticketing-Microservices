import express, { Response, Request } from "express";
import { Ticket } from "../models/ticket";
import { NotFoundError } from "@srayen-tickets/common";

const router = express.Router();
router.get("/api/tickets", async (req: Request, res: Response) => {
  const tickets = await Ticket.find({
    orderId: undefined, //To return only available tickets (reserved tickets have an orderId)
  });

  res.send(tickets);
});

export { router as indexTicketRouter };
