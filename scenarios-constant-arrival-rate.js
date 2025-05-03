/*
Você define a taxa de chegada (taxa de quisições) por unidade de tempo.
Essa taxa vai se manter constante durante o teste.
*/

import http from "k6/http";

import { sleep } from "k6";

export const options = {
  scenarios: {
    contacts: {
      executor: "constant-arrival-rate", // executor que mantém uma taxa de chegada constante
      rate: 30, // taxa de chegada de 10 requisições por segundo
      timeUnit: "1s", // unidade de tempo para a taxa de chegada
      duration: "30s", // duração do cenário
      preAllocatedVUs: 50, // número pré-alocado de VUs
    },
  },
};

export default function () {
  const res = http.get("https://test.k6.io/contacts.php");
  sleep(1); // espera 1 segundo
}
