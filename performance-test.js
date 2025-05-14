/*
Teste de desempenho usando a api publica do k6
https://test-api.k6.io/public/crocodiles/<id>/

critérios de sucesso:
  - Performance teste
    1 - Ramp up de 0 para 10 VUs em 10s
    2 - Carga de 10 VUs por 30s
    3 - Ramp down de 10 para 0 VUs em 10s
  - Limites:
    1 Requisições com sucesso maior que 99%
    2 Tempo de requisição p(95) menor que 200ms
*/
import http from "k6/http";
import { check } from "k6";
import { SharedArray } from "k6/data";

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  stages: [
    { duration: "5s", target: 10 }, // ramp up de 0 para 10 VUs em 10s
    { duration: "15s", target: 10 }, // carga de 10 VUs por 30s
    { duration: "5s", target: 0 }, // ramp down de 10 para 0 VUs em 10s
  ],
  thresholds: {
    checks: ["rate > 0.99"], // maior que 99% de sucesso
    http_req_duration: ["p(95) < 300"], // p(95) menor que 200ms
  },
};

const data = new SharedArray("crocodiles", function () {
  return JSON.parse(open("./dados.json")).crocodiles;
});

export default function () {
  const id = data[Math.floor(Math.random() * data.length)].id;
  const BASE_URL = `https://test-api.k6.io/public/crocodiles/${id}/`;

  const res = http.get(BASE_URL);
  check(res, {
    "status is 200": (r) => r.status === 200,
  });
}

export function handleSummary(data) {
  return {
    "index.html": htmlReport(data),
  };
}
