// Limites são métricas usadas como critérios de aprovação ou desaprovação
// que esperamos que o teste atenda. Eles são definidos como um número entre 0 e 1.

import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 5,
  duration: "5s",
  thresholds: {
    // menos de 1% de falhas
    http_req_failed: ["rate < 0.01"],
    // 95% das requisições devem ser concluídas em menos de 0.4 segundos
    http_req_duration: [{ threshold: "p(95) < 400", abortOnFail: true }],
    // 99% das requisições devem ser realizadas com status 200
    checks: [
      {
        threshold: "rate > 0.99",
        abortOnFail: true,
        delayAbortEval: "5s",
      },
    ],
  },
};

export default function () {
  const req = http.get("https://test.k6.io");

  check(req, {
    "status is 200": (r) => r.status === 200,
  });
}
