import { createService } from "rpc-light/client.js";
import axios from "axios";
import { isNode } from "~/util/runtime.js";

const http = axios.create({
  // FIXME: hard-coded port
  ...(isNode ? { baseURL: "http://localhost:8080/" } : null),
});

const service = createService(callHandler);
export default service;

async function callHandler(...args) {
  const { path } = this;
  const payload = { path, args };
  return await http.post("/rpc", payload).then(res => res.data);
}
