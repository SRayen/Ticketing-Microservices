import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }

  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defined");
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }

  try {
    //connect to NATS (we have created a class to simulate mongoose's accessibility )
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    //Capture any close event
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });

    //2 listeners:Watching for interrupt signals or terminate signals (Exp:ctrl + c in terminal)
    process.on("SIGINT", () => natsWrapper.client.close()); //Interrupt
    process.on("SIGTERM", () => natsWrapper.client.close()); //Terminate

    new OrderCreatedListener(natsWrapper.client).listen();
  } catch (error) {
    console.error(error);
  }
};

start();
