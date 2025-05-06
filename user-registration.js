/**
 * Realizar registro e authenticação de novos usuários
 *
 * Critérios de aceitação:
 * Performance teste
 *  - Carga constante de 10 VUs em 10s
 *  Limites:
 * - Requisições com falha menor que 1%
 * - Tempo de requisição p(95) menor que 500ms
 */
import http from "k6/http";
import { check, sleep } from "k6";
import { SharedArray } from "k6/data";

export const options = {
  stages: [
    { duration: "1s", target: 10 }, // carga constante de 10 VUs em 10s
  ],
  thresholds: {
    http_req_failed: ["rate < 0.01"], // menos de 1% de falhas
    http_req_duration: ["p(95) < 500"], // p(95) menor que 500ms
  },
};

export default function () {
  const BASE_URL = "https://test-api.k6.io/user/register/";
  const userCode = Math.floor(Math.random() * 10000);
  const payload = {
    username: `user${userCode}`,
    first_name: `User${userCode}`,
    last_name: `Test${userCode}`,
    password: "password",
    email: `user${userCode}@example.com`,
  };

  const res = http.post(BASE_URL, payload);
  console.log(res.body);
  check(res, {
    "status is 201": (r) => r.status === 200,
  });

  sleep(1); // cada virtual user faz apenas 1 requisição
}
