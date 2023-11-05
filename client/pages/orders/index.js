import React from "react";

const OrderIndex = ({ orders }) => {
  return (
    // <ul>
    //   {orders.map((order) => (
    //     <li key={order.id}>
    //       {order.ticket.title} - {order.status}
    //     </li>
    //   ))}
    // </ul>
    <table className="table table-hover ">
      <thead className="fs-2">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody className="fs-3">
        {orders.map((order) => (
          <tr
            className={`table-${
              order.status === "complete" ? "success" : "danger"
            }`}
          >
            <td>{order.ticket.title}</td>
            <td>{order.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get(`/api/orders`);
  return { orders: data };
};

export default OrderIndex;
