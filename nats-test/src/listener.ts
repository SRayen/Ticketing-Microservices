import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListener } from "./events/ticket-created-listener";

console.clear();
//stan is an actual instance or a client that
// we're using to connect to NATS Streaming Server.
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

//Watching for interrupt signals or terminate signals (Exp:ctrl + c in terminal)
process.on("SIGINT", () => stan.close()); //Interrupt
process.on("SIGTERM", () => stan.close()); //Terminate