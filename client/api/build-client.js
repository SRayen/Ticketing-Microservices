import axios from "axios";

export default ({ req }) => {
  if (typeof window === "undefined") {
    //  we are on the server (!browser)

    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    //  we are on the browser
    return axios.create({
      //we do not need to include any headers because the browser is going to take care of all that stuff
      baseURL: "/",
    });
  }
};

//RQ: we are using headers (to transfer cookies (sent by the client))
