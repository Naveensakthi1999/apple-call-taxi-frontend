import http from "../http-common";

const check = data => {
  return http.post("/tutorials", data);
};

const loginService = {
  check
};

export default loginService;
