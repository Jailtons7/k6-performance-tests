import http from "k6/http";
import { check } from "k6";
import { Counter } from "k6/metrics"; // Counter é uma métrica do tipo contador
import { Gauge } from "k6/metrics"; // Gauge é uma métrica do tipo medidor
import { Rate } from "k6/metrics"; // Rate é uma métrica do tipo taxa
import { Trend } from "k6/metrics"; // Trend é uma métrica do tipo tendência

export const options = {
  vus: 1,
  duration: "3s",
};

const httpQuantity = new Counter("http_quantity"); // Cria um contador para rastrear requisições HTTP
const httpBlokedDuration = new Gauge("http_blocked_time"); // Cria um medidor para rastrear o tempo bloqueado
const http200Rate = new Rate("http_200_rate"); // Cria uma taxa de sucesso para rastrear a porcentagem de respostas 200
const httpWatingRate = new Trend("http_ waiting_rate"); // Cria uma tendência para rastrear o tempo de resposta

export default function () {
  const resp = http.get("https://test.k6.io"); // Faz uma requisição GET para o site de teste
  check(resp, {
    "status is 200": (r) => {
      if (r.status === 200) {
        // metrica do tipo taxa
        http200Rate.add(1); // Adiciona 1 à taxa de sucesso se o status for 200
        return true;
      }
    },
    "body is not empty": (r) => r.body.length > 0,
    "response time is less than 200ms": (r) => r.timings.duration < 250,
  });
  // metrica do tipo contador
  httpQuantity.add(1); // Incrementa o contador de requisições HTTP
  // metrica do tipo medidor
  httpBlokedDuration.add(resp.timings.blocked); // Adiciona o tempo bloqueado ao medidor
  // metrica do tipo tendencia
  httpWatingRate.add(resp.timings.waiting); // Adiciona o tempo de espera à tendência
}
