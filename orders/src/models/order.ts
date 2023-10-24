import { OrderStatus } from "@srayen-tickets/common";
import mongoose from "mongoose";
import { TicketDoc } from "./ticket";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

export { OrderStatus };

interface OrderAttrs {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
}

/*we create separate interfaces:prev & this interface because  prop that are required to create an order 
might be different than the prop that actually end up on an order */
interface OrderDoc extends mongoose.Document {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
  version: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus), //to be sure that status is one of the values listed inside that enum
      default: OrderStatus.Created,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
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

orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);

//The role of build fct here is to allow TS to do some validation
orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};
//Order Model:
//The OrderDoc type is the type of the document that will be stored in the database.
//The OrderModel type is the type of the model object that is returned by the mongoose.model() function.
//1er param: name of the model
//2nd param:schema for the model
const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
