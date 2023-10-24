import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
} 

interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
  version: number; //for versioning
  orderId?: string;
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
    },
    userId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
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

//for versioning:
ticketSchema.set("versionKey", "version");
ticketSchema.plugin(updateIfCurrentPlugin);

//The role of build fct here is to allow TS to do some validation
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};
//Ticket Model:
//The TicketDoc type is the type of the document that will be stored in the database.
//The TicketModel type is the type of the model object that is returned by the mongoose.model() function.
//1er param: name of the model
//2nd param:schema for the model
const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
