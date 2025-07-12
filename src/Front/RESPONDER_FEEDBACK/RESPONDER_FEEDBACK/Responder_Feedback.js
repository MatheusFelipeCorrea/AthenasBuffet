document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get("idEvento"); // Agora pega o ID do evento

  if (eventId) {
    loadFeedbackDetailsByEvent(eventId); // Função alterada para buscar com base no evento
  } else {
    alert("ID do evento não encontrado.");
  }

  // Função para enviar a resposta
  const form = document.getElementById("feedback-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const resposta = document.getElementById("respostaBuffet").value;
    
    if (resposta) {
      try {
        const response = await fetch(`http://localhost:8080/api/feedback/evento/${eventId}/responder`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resposta })
        });

        if (response.ok) {
          alert("Resposta enviada com sucesso!");
          // Oculta o campo de resposta e o botão de envio
          document.getElementById("respostaBuffet").setAttribute("readonly", true);
          document.querySelector(".submit-btn").classList.add("hidden");
        } else {
          alert("Erro ao enviar a resposta.");
        }
      } catch (error) {
        console.error("Erro de conexão:", error);
        alert("Erro ao conectar com o servidor.");
      }
    } else {
      alert("Por favor, insira uma resposta.");
    }
  });
});

async function loadFeedbackDetailsByEvent(eventId) {
  try {
    const response = await fetch(`http://localhost:8080/api/feedback/evento/${eventId}`); // Busca por ID do evento
    if (response.ok) {
      const feedback = await response.json();
      console.log("Feedback recebido:", feedback); // Verifique o conteúdo do feedback
      displayFeedback(feedback);
    } else {
      console.error("Erro ao carregar detalhes do feedback:", response.statusText);
    }
  } catch (error) {
    console.error("Erro de conexão:", error);
  }
}

function displayFeedback(feedback) {
  const nomeField = document.getElementById("nome");
  if (nomeField) nomeField.value = feedback.nome;

  const emailField = document.getElementById("email");
  if (emailField) emailField.value = feedback.email;

  const comentariosField = document.getElementById("comentarios");
  if (comentariosField) comentariosField.value = feedback.comentariosAdicionais;

  // Configurar avaliações
  setRating("garcom", feedback.avaliacaoGarcom);
  setRating("organizacao", feedback.avaliacaoOrganizacao);
  setRating("equipe", feedback.avaliacaoEquipe);
  setRating("pratos", feedback.avaliacaoPratos);

  // Verificar se já existe uma resposta do buffet
  const respostaBuffetField = document.getElementById("respostaBuffet");
  const submitButton = document.querySelector(".submit-btn");

  if (feedback.respostaBuffet && feedback.respostaBuffet !== "Não há resposta ainda") {
    respostaBuffetField.value = feedback.respostaBuffet;
    respostaBuffetField.setAttribute("readonly", true); // Desativar campo de resposta
    submitButton.classList.add("hidden"); // Ocultar botão de envio
  } else {
    respostaBuffetField.value = ""; // Limpa o campo caso seja "Não há resposta ainda"
    respostaBuffetField.removeAttribute("readonly"); // Permitir edição caso não haja resposta
    submitButton.classList.remove("hidden"); // Exibir botão de envio caso não haja resposta
  }
}

function setRating(categoryId, value) {
  const container = document.getElementById(categoryId);
  if (!container) return;

  container.innerHTML = ""; 

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("i");
    star.textContent = "★";
    
    // Adiciona a classe 'selected' apenas se o valor da estrela for menor ou igual ao valor da avaliação
    if (i <= value) {
      star.classList.add("selected");
    }
    
    container.appendChild(star);
  }
}
