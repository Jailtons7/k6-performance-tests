import http from "k6/http";
import { check } from "k6";
import { Counter, Gauge } from "k6/metrics";

export const options = {
  vus: 1,
  duration: "3s",
};

const httpQuantity = new Counter("http_quantity"); // Cria um contador para rastrear requisições HTTP
const httpBlokedDuration = new Gauge("http_blocked_time"); // Cria um medidor para rastrear o tempo bloqueado

export default function () {
  const resp = http.get("https://test.k6.io"); // Faz uma requisição GET para o site de teste
  check(resp, {
    "status is 200": (r) => r.status === 200,
    "body is not empty": (r) => r.body.length > 0,
    "response time is less than 200ms": (r) => r.timings.duration < 250,
  });
  httpQuantity.add(1); // Incrementa o contador de requisições HTTP
  httpBlokedDuration.add(resp.timings.blocked); // Adiciona o tempo bloqueado ao medidor
}
