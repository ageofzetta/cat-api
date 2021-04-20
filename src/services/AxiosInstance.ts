import Axios from "axios";

const options = {
  baseURL: "https://api.thecatapi.com/v1/",
  // TODO: Protect API Key
  headers: { "x-api-key": "24be637f-e596-4847-b47a-1791feeea1bd" },
};
const AxiosInstance = Axios.create(options);

export default AxiosInstance;
