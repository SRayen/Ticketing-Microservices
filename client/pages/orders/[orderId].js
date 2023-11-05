import { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: (payment) => Router.push("/orders"),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft(); //Manually run for the first time

    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    }; // cleanup on unmount
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  return (
    <div className="text-center fs-1 my-5">
      <h1> Time left to pay: {timeLeft} seconds</h1>

      {/* No Security risk for stripeKey (public key) */}
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51O74LkF1rJOoBdBDnOsz3UKDhoGft8gKl8QcIq3qFsqQXtnBEoLI6V63IMLKwIxqWqgDBRUAaG3dWsNAkmOi5jFs003D09V2wl"
        amount={order.ticket.price * 100} //*100 : convert to cents
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
};

export default OrderShow;
