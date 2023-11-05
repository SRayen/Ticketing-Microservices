import Link from "next/link";
import React from "react";

const LandingPage = ({ currentUser, tickets }) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            <div>View</div>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div className="text-center">
      <span class="badge bg-success m-3 w-25 h-25 fs-4">Tickets</span>
      <table className="table table-striped">
        <thead className="fs-2">
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody className="fs-3">{ticketList}</tbody>
      </table>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get("/api/tickets");
  return { tickets: data };
};

export default LandingPage;

//RQ: context is an obj with following properties:
//pathname, asPath, query, req, res, err
