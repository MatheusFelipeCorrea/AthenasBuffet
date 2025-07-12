document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idBuffet = urlParams.get("idBuffet");
  console.log("[INFO] ID do Buffet obtido da URL:", idBuffet);

  if (idBuffet) {
    fetchFeedbacks(idBuffet);
  } else {
    alert("ID do buffet não encontrado na URL.");
  }

  // Configurar evento de busca
  document.getElementById("search-bar").addEventListener("input", () => {
    const searchValue = document.getElementById("search-bar").value.toLowerCase();
    fetchFeedbacks(idBuffet, searchValue);
  });
});

async function fetchFeedbacks(idBuffet, searchValue = "") {
  try {
    console.log("[INFO] Buscando feedbacks para o Buffet com ID:", idBuffet);

    const url = `http://localhost:8080/api/feedback`;
    console.log("[INFO] URL da requisição:", url);

    const response = await fetch(url);
    if (response.ok) {
      let feedbacks = await response.json();
      console.log("[INFO] Feedbacks resgatados do backend:", feedbacks);

      // Filtrar feedbacks pelo ID do buffet
      feedbacks = feedbacks.filter(feedback => feedback.idBuffet == idBuffet);
      console.log("[INFO] Feedbacks filtrados pelo Buffet ID:", feedbacks);

      // Aplicar filtro de busca por nome ou e-mail, se necessário
      if (searchValue) {
        feedbacks = feedbacks.filter(feedback =>
          feedback.nome.toLowerCase().includes(searchValue) ||
          feedback.email.toLowerCase().includes(searchValue)
        );
        console.log("[INFO] Feedbacks após aplicar filtro de busca:", feedbacks);
      }

      displayFeedbacks(feedbacks);
    } else {
      console.error("[ERROR] Erro ao carregar feedbacks:", response.statusText);
    }
  } catch (error) {
    console.error("[ERROR] Erro de conexão ao buscar feedbacks:", error);
  }
}

function displayFeedbacks(feedbacks) {
  const feedbackList = document.getElementById("feedback-list");
  feedbackList.innerHTML = "";

  if (feedbacks.length === 0) {
    console.log("[INFO] Nenhum feedback encontrado para exibição.");
    feedbackList.innerHTML = "<p>Nenhum feedback encontrado.</p>";
  } else {
    console.log(`[INFO] Exibindo ${feedbacks.length} feedback(s).`);
    feedbacks.forEach(feedback => {
      const feedbackItem = document.createElement("div");
      feedbackItem.classList.add("feedback-item");
      feedbackItem.innerHTML = `
        <p><strong>Nome:</strong> ${feedback.nome}</p>
        <p><strong>Email:</strong> ${feedback.email}</p>
        <p><strong>Status:</strong> ${
          feedback.respostaBuffet && feedback.respostaBuffet !== "Não há resposta ainda" 
            ? "Respondido" 
            : "Não respondido"
        }</p>
        <button onclick="redirectToDetails(${feedback.idEvento})">Ver mais</button>
      `;
      feedbackList.appendChild(feedbackItem);
    });
  }
}


function redirectToDetails(idEvento) {
  // Redireciona para a página de detalhes com o ID do evento na URL
  const baseUrl = "http://127.0.0.1:8081/src/Front/RESPONDER_FEEDBACK/RESPONDER_FEEDBACK/Responder_Feedback.html";
  const url = `${baseUrl}?idEvento=${idEvento}`;
  console.log("[INFO] Redirecionando para:", url);
  window.location.href = url;
}
