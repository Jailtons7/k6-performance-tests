import http from "k6/http";
import { check, sleep } from "k6";

// This is a smoke test to check if the server is up and running.
export const options = {
  vus: 1,
  duration: "30s",
  thresholds: {
    checks: ["rate > 0.99"],
  },
};

export default function () {
  const BASE_URL = "https://test-api.k6.io/public/crocodiles/";
  const res = http.get(BASE_URL);
  check(res, {
    "status is 200": (r) => r.status === 200,
  });
}
