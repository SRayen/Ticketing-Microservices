import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  //'?' To tell TS that this prop might be undefined for some periods of time
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error("Cannot access NATS before connecting");
    }
    return this._client;
  }
  //RQ: we are sure that inside our code first: we will call 'connect()' and in second time we will call 'client'
  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });
    //We will wrap with a Promise : To allow us next to use async await
    return new Promise<void>((resolve, reject) => {
      this.client.on("connect", () => {
        console.log("Connected to NATS");
        resolve();
      });
      this.client.on("error", (err) => {
        reject(err);
      });
    });
  }
}

//The instance of the class NatsWrapper that will be shared between all of our different files
export const natsWrapper = new NatsWrapper();
