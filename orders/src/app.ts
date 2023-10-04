import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@srayen-tickets/common";
import { deleteOrderRouter } from "./routes/delete";
import { indexOrderRouter } from "./routes/index";
import { newOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";

const app = express();
app.set("trust proxy", true); //For Express to trust  the proxy of ingress-nginx
app.use(json());
app.use(
  cookieSession({
    signed: false, //disable encryption: (To be understood between diff languages!) / (JWT is already encrypted)
    secure: process.env.NODE_ENV !== "test", //True in PROD (only used with https)  //False in TEST (To work without https)
    //RQ: NODE_ENV variable are : development | production | test
  })
);

app.use(currentUser);

app.use(deleteOrderRouter);
app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
