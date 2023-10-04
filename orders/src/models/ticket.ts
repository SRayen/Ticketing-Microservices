import mongoose from "mongoose";
import { Order, OrderStatus } from "./order";

interface TicketAttrs {
  title: string;
  price: number;
}

export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  isReserved(): Promise<boolean>;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    //manipulate the JSON representation
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
//Add method directly to the ticket Model itself  :
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

//Add method to the Document :
//RQ: in this case (we will us 'this') we must use function & not arrow function (prblm related to Mongooose)
ticketSchema.methods.isReserved = async function () {
  // 'this'==the ticket document that we just called 'isReserved' on
  const existingOrder = await Order.findOne({
    ticket: this as any,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });
  return !!existingOrder; //'!!' to prevent case null (!null =>tru e)
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
