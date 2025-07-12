document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idEvento = urlParams.get("idEvento");
  console.log("[INFO] ID do Evento obtido da URL:", idEvento);

  const userId = localStorage.getItem("userId");
  console.log("[INFO] User ID obtido do localStorage:", userId);

  let idBuffet = null;

  // Busca e preenche automaticamente os dados do usuário
  if (userId) {
    try {
      const response = await fetch(`http://localhost:8080/api/feedback/cliente/${userId}`);
      if (response.ok) {
        const usuario = await response.json();
        console.log("[INFO] Dados do usuário carregados:", usuario);

        // Preenche os campos de nome e email automaticamente
        document.getElementById("nome").value = usuario.nome || "";
        document.getElementById("email").value = usuario.email || "";
      } else {
        console.warn("[WARN] Não foi possível carregar os dados do usuário.");
      }
    } catch (error) {
      console.error("[ERROR] Erro ao buscar os dados do usuário:", error);
    }
  } else {
    console.warn("[WARN] Nenhum userId encontrado no localStorage.");
  }

  if (idEvento) {
    try {
      const buffetResponse = await fetch(`http://localhost:8080/api/feedback/${idEvento}/buffet`);
      if (buffetResponse.ok) {
        idBuffet = await buffetResponse.json();
        console.log("[INFO] ID do Buffet encontrado:", idBuffet);
      } else {
        console.warn("[WARN] Nenhum idBuffet encontrado para este idEvento.");
      }
    } catch (error) {
      console.error("[ERROR] Erro ao buscar idBuffet:", error);
    }

    const feedbackExistente = await carregarFeedbackExistente(idEvento);
    if (feedbackExistente) {
      console.log("[INFO] Feedback existente encontrado:", feedbackExistente);
      inicializarEstrelas(false);
      preencherFormulario(feedbackExistente);
      tornarFormularioNaoEditavel(feedbackExistente.respostaBuffet);
    } else {
      console.log("[INFO] Nenhum feedback encontrado para este ID de evento.");
      inicializarEstrelas(true);
    }
  } else {
    console.log("[WARN] ID do Evento não fornecido.");
    inicializarEstrelas(true);
  }

  document.getElementById("feedbackForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const feedback = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      avaliacaoGarcom: getRatingValue("garcom"),
      avaliacaoOrganizacao: getRatingValue("organizacao"),
      avaliacaoEquipe: getRatingValue("equipe"),
      avaliacaoPratos: getRatingValue("pratos"),
      comentariosAdicionais: document.getElementById("comentarios").value,
      idBuffet: idBuffet ? parseInt(idBuffet) : null,
      idEvento: idEvento ? parseInt(idEvento) : null,
      idCliente: userId ? parseInt(userId) : null,
    };

    console.log("[INFO] Feedback a ser enviado:", feedback);

    try {
      const response = await fetch("http://localhost:8080/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback),
      });

      if (response.ok) {
        console.log("[INFO] Feedback enviado com sucesso!");
        alert("Feedback enviado com sucesso!");
        document.getElementById("feedbackForm").reset();
        resetRatings();
        location.reload();
      } else {
        console.error("[ERROR] Erro ao enviar feedback:", response.statusText);
        alert("Erro ao enviar feedback.");
      }
    } catch (error) {
      console.error("[ERROR] Erro de conexão ao enviar feedback:", error);
      alert("Erro ao conectar com o servidor.");
    }
  });

  async function carregarFeedbackExistente(idEvento) {
    try {
      const response = await fetch(`http://localhost:8080/api/feedback/evento/${idEvento}`);
      if (response.ok) {
        const feedback = await response.json();
        console.log("[INFO] Feedback carregado do servidor:", feedback);
        return feedback;
      } else if (response.status === 404) {
        console.warn("[WARN] Feedback não encontrado para o ID de evento:", idEvento);
        return null;
      }
    } catch (error) {
      console.error("[ERROR] Erro ao carregar feedback existente:", error);
    }
    return null;
  }

  function inicializarEstrelas(editavel = true) {
    const starsContainers = document.querySelectorAll(".stars");
    starsContainers.forEach((container) => {
      const category = container.getAttribute("data-category");
      console.log(`[INFO] Inicializando estrelas para categoria: ${category}`);

      for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");
        star.textContent = "★";
        star.setAttribute("data-value", i);

        if (editavel) {
          star.addEventListener("click", () => {
            setRating(container, i);
            container.setAttribute("data-rating", i);
          });
        }

        container.appendChild(star);
      }
    });
  }

  function preencherFormulario(feedback) {
    console.log("[INFO] Preenchendo formulário com os dados do feedback:", feedback);

    const nomeField = document.getElementById("nome");
    const emailField = document.getElementById("email");
    const comentariosField = document.getElementById("comentarios");
    const respostaBuffetField = document.getElementById("respostaBuffet");
    const respostaContainer = document.getElementById("respostaContainer");

    if (nomeField) nomeField.value = feedback.nome;
    if (emailField) emailField.value = feedback.email;
    if (comentariosField) comentariosField.value = feedback.comentariosAdicionais;

    if (respostaBuffetField) {
      respostaBuffetField.value = feedback.respostaBuffet || "Não há resposta ainda";
      respostaBuffetField.setAttribute("readonly", true);
  
      if (respostaContainer) {
          respostaContainer.style.display = "block";
          console.log("[INFO] Resposta do Buffet exibida no formulário:", respostaBuffetField.value);
      } else {
          console.warn("[WARN] Elemento respostaContainer não encontrado.");
      }
  }
  
    // Preenche as estrelas
    setRating(document.querySelector(`.stars[data-category="garcom"]`), feedback.avaliacaoGarcom);
    setRating(document.querySelector(`.stars[data-category="organizacao"]`), feedback.avaliacaoOrganizacao);
    setRating(document.querySelector(`.stars[data-category="equipe"]`), feedback.avaliacaoEquipe);
    setRating(document.querySelector(`.stars[data-category="pratos"]`), feedback.avaliacaoPratos);
  }

  function tornarFormularioNaoEditavel(respostaBuffet) {
    console.log("[INFO] Tornando o formulário não editável");

    const nomeField = document.getElementById("nome");
    const emailField = document.getElementById("email");
    const comentariosField = document.getElementById("comentarios");
    const respostaContainer = document.getElementById("respostaContainer");

    if (nomeField) nomeField.setAttribute("readonly", true);
    if (emailField) emailField.setAttribute("readonly", true);
    if (comentariosField) comentariosField.setAttribute("readonly", true);

    if (respostaContainer) {
      respostaContainer.style.display = "block";
      console.log("[INFO] Exibindo a resposta do Buffet na versão não editável. Resposta:", respostaBuffet);
    } else {
      console.warn("[WARN] Elemento respostaContainer não encontrado.");
    }

    const submitButton = document.querySelector("button[type='submit']");
    if (submitButton) {
      submitButton.style.display = "none";
      console.log("[INFO] Botão de envio ocultado");
    }
  }

  function setRating(container, value) {
    console.log(`[INFO] Definindo ${value} estrelas para a categoria`, container.getAttribute("data-category"));

    const stars = container.querySelectorAll("span");
    stars.forEach((star, index) => {
      if (index < value) {
        star.classList.add("active");
      } else {
        star.classList.remove("active");
      }
    });

    // Atualiza o atributo `data-rating`
    if (container) {
      container.setAttribute("data-rating", value);
    }
  }

  function getRatingValue(category) {
    const container = document.querySelector(`.stars[data-category="${category}"]`);
    const rating = container ? parseInt(container.getAttribute("data-rating")) || 0 : 0;
    console.log(`[INFO] Valor de avaliação para ${category}:`, rating);
    return rating;
  }

  function resetRatings() {
    console.log("[INFO] Resetando estrelas");

    const starsContainers = document.querySelectorAll(".stars");
    starsContainers.forEach((container) => {
      container.setAttribute("data-rating", 0);
      const stars = container.querySelectorAll("span");
      stars.forEach((star) => star.classList.remove("active"));
    });
  }
});
