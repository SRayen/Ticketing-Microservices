import axios from "axios";
import { useState } from "react";

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);
  //props = {} is useful in cases where we will send additional properties to include with the req body
  const doRequest = async (props = {}) => {
    try {
      setErrors(null); //Clear prev Error
      const response = await axios[method](url, { ...body, ...props });
      //Success case of the request  :
      //If onSuccess callBack was provided:
      if (onSuccess) {
        //onSuccess()
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      setErrors(
        <div>
          <h1>Opps...</h1>
          {err.response.data.errors.map((err, index) => (
            <div className="alert alert-danger" key={index}>
              <ul>
                <li>{err.message}</li>
              </ul>
            </div>
          ))}
        </div>
      );
    }
  };
  return { doRequest, errors };
};

export default useRequest;
