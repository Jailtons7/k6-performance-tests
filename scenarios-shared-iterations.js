/*
A utilização de scenarios traz ganhos:

1 - Organização: podemos declarar diferentes cenários em um único arquivo, cada um com suas próprias opções e configurações.
2 - Simulações mais realistas: podemos simular diferentes tipos de usuários com diferentes comportamentos e padrões de carga.
3 - Cargas de trabalho paralelas e independentes
4 - Análise mais granular

Opções de configuração disponíveis para cenários:
1 - executor
2 - startTime
3 - gracefulStop
4 - exec
5 - env
6 - tags
*/
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  scenarios: {
    contacts: {
      executor: "shared-iterations", // não sabemos quantas iterações serão executadas por cada VU
      vus: 10,
      iterations: 200, // número total de iterações
      maxDuration: "30s", // duração máxima do cenário
    },
  },
};

export default function () {
  const res = http.get("https://test.k6.io/contacts.php");
  sleep(1); // espera 1 segundo
}
