document.getElementById('vagaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Captura o userId do local storage (caso necessário para associar ao buffet)
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
        alert("ID do usuário não encontrado. Por favor, faça login novamente.");
        return;
    }

    console.log("userId capturado do Local Storage:", userId); // Log para verificar o userId

    // Captura os dados dos campos do formulário
    const dados = {
        idadeMinima: document.getElementById('idadeMinima').value,
        cargo: document.getElementById('cargo').value,
        descricaoVaga: document.getElementById('descricaoVaga').value,
        experienciaPrevia: document.getElementById('experienciaPrevia').value,
        qualificacoesProcuradas: document.getElementById('qualificacoesProcuradas').value,
        habilidadesExigidas: document.getElementById('habilidadesExigidas').value,
        atuacao: document.getElementById('atuacao').value,
        jornadaTrabalho: document.getElementById('jornadaTrabalho').value,
        cep: document.getElementById('cep').value,
        bairro: document.getElementById('bairro').value,
        rua: document.getElementById('rua').value,
        numero: document.getElementById('numero').value,
        salario: parseFloat(document.getElementById('salario').value),
        beneficios: document.getElementById('beneficios').value,
        idBuffet: userId, // Inclui o ID do buffet (usuário logado)
        status: "aberta" // Define o status como "aberta"
    };

    console.log("Dados a serem enviados ao backend:", dados); // Log para verificar o objeto de dados

    // Envia os dados para o backend usando Fetch API
    fetch('http://localhost:8080/api/vagas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                alert("Erro ao criar a vaga: " + text); // Exibe mensagem de erro do backend
                throw new Error(text);
            });
        }
        return response.text();
    })
    .then(data => {
        alert("Vaga criada com sucesso!");
        console.log("Resposta do backend:", data);
        document.getElementById('vagaForm').reset(); // Limpa o formulário
    })
    .catch(error => {
        console.error('Erro:', error);
        alert("Erro ao tentar enviar o formulário: " + error.message); // Alerta para erro de rede ou outro problema
    });
});
