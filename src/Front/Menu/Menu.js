document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("menuForm");
  
    // Função para capturar parâmetros da URL
    function getURLParams() {
      const urlParams = new URLSearchParams(window.location.search);
      return {
        buffetId: urlParams.get("buffetId"),
        eventoId: urlParams.get("eventoId"),
      };
    }
  
    // Adiciona evento de submissão ao formulário
    form.addEventListener("submit", async function (event) {
      event.preventDefault(); // Evita recarregar a página
  
      // Captura os valores do formulário
      const formData = {
        sobremesa: form.sobremesa.value,
        pratoPrincipal: form.prato_principal.value,
        acompanhamento: form.acompanhamento.value,
        bebidas: form.bebidas.value,
        entrada: form.entrada.value,
        vegetariano: form.vegetariano.value,
        orcamentoMaximo: parseFloat(form.orcamento_maximo.value) || null,
        observacoes: form.observacoes.value,
      };
  
      // Captura os parâmetros da URL e o userId do localStorage
      const { buffetId, eventoId } = getURLParams();
      const userId = localStorage.getItem("userId");
  
      // Verifica se todos os IDs estão presentes
      if (!buffetId || !eventoId || !userId) {
        alert("Erro: Não foi possível obter os IDs necessários.");
        return;
      }
  
      try {
        // Faz a requisição POST para o backend
        const response = await fetch(
          `http://127.0.0.1:8080/api/menus?buffetId=${buffetId}&eventoId=${eventoId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              UserId: userId, // Envia o userId no cabeçalho
            },
            body: JSON.stringify(formData),
          }
        );
  
        if (response.ok) {
          const result = await response.json();
          alert("Menu salvo com sucesso!");
          console.log("Resposta do servidor:", result);
          form.reset(); // Limpa o formulário após o envio
          window.location.href = "../Acompanhe_Pedido2/Acompanhe_Pedido_2.html";
        } else {
          const error = await response.json();
          console.error("Erro ao salvar o menu:", error);
          alert("Erro ao salvar o menu. Verifique os dados e tente novamente.");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro de conexão com o servidor. Tente novamente mais tarde.");
      }
    });
  });
  