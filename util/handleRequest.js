import { JWT_TOKEN_NAME } from "@/constants/constants";
import axios from "axios";

const handleAxiosRequest = ({api, method = 'get', payloadData}) => {
  let config = {
    method,
    url: `http://localhost:5000/api/${api}`,
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${localStorage.getItem(JWT_TOKEN_NAME)}`
    },
    data: payloadData,
  };
  return axios.request(config);
}

export default handleAxiosRequest;
