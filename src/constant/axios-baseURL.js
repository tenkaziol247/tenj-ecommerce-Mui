import axios from "axios";

const instance = axios.create({
  baseURL: "https://tenj-ecommerce-mui.firebaseio.com/",
});

export default instance;
