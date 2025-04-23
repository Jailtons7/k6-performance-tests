// Inicialização
import sleep from "k6";

// configuração
export const options = {
  vus: 1, // número de usuários virtuais
  duration: "10s", // duração do teste
};

// execução
export default function () {
  console.log("Hello World");
  sleep(1); // espera 1 segundo
}

// Desmontagem
export function teardown(data) {
  console.log("Desmontado");
  console.log(data);
  // Aqui você pode adicionar lógica para limpar ou processar dados após o teste
  // Por exemplo, você pode salvar os dados em um arquivo ou enviar para um servidor
}

// Para executar o teste, use o comando:
// k6 run aula1.js
// Para executar o teste com um arquivo de configuração, use o comando:
// k6 run -c config.json aula1.js
