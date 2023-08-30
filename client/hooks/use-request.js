import axios from "axios";
import { useState } from "react";

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);
  const doRequest = async () => {
    try {
      setErrors(null); //Clear prev Error  
      const response = await axios[method](url, body);
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
          {err.response.data.errors.map((err) => (
            <div className="alert alert-danger">
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
