import React from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) =>
      Router.push("/orders/[orderId]", `/orders/${order.id}`),
  });
  return (
    <div className="w-100 text-center">
      <div
        className="card border-primary my-5 mx-auto w-25"
        style={{ maxWidth: "20 rem" }}
      >
        <div className="card-header  fs-3">{ticket.title}</div>
        <div className="card-body">
          <h4 className="card-title fs-5">Price: {ticket.price}</h4>
        </div>
      </div>
      <button onClick={() => doRequest()} className="btn btn-primary">
        Purchase
      </button>
      {errors}
    </div>
  );
};

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default TicketShow;
