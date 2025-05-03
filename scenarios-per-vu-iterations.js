import http from "k6/http";
import { sleep } from "k6";

export const options = {
  scenarios: {
    contacts: {
      executor: "per-vu-iterations",
      vus: 10,
      iterations: 20, // cada VU executa 20 iterações
      maxDuration: "30s",
    },
  },
};

export default function () {
  const res = http.get("https://test.k6.io/contacts.php");
  sleep(1); // espera 1 segundo
}
