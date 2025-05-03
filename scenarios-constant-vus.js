import http from "k6/http";
import { sleep } from "k6";

export const options = {
  scenarios: {
    contacts: {
      executor: "constant-vus", // executor que mantém um número fixo de VUs
      vus: 10, // as 10 VUs estarão executando durante toda a duração do cenário
      duration: "30s", // duração do cenário
    },
  },
};

export default function () {
  const res = http.get("https://test.k6.io/contacts.php");
  sleep(1); // espera 1 segundo
}
