// Função para pesquisar um cliente e exibir os formulários de evento e menu
function search() {
    const query = document.getElementById("searchBar").value.toLowerCase();
    if (query === "davi") {
        document.getElementById("forCandidatura").style.display = "block";
        document.getElementById("formVagas").style.display = "block";
    } else {
        document.getElementById("forCandidatura").style.display = "none";
        document.getElementById("formVagas").style.display = "none";
        alert("Cliente não encontrado.");
    }
}

// Função para alternar entre os formulários de Evento, Menu e Candidatos a Vagas
function showForm(formType) {
    document.getElementById("forCandidatura").classList.add("hidden");
    document.getElementById("formVagas").classList.add("hidden");
    document.getElementById("formCandidatos").classList.add("hidden");

    if (formType === "event") {
        document.getElementById("forCandidatura").classList.remove("hidden");
        fetchCandidaturas(); // Carrega as candidaturas do usuário logado
    } else if (formType === "menu") {
        document.getElementById("formVagas").classList.remove("hidden");
    } else if (formType === "candidatos") {
        document.getElementById("formCandidatos").classList.remove("hidden");
        fetchVagas(); // Carrega as vagas disponíveis
    }
}

// Função para buscar e exibir todas as vagas de garçom sem filtros
function fetchVagas() {
    console.log("fetchVagas foi chamada");

    fetch('http://localhost:8080/api/vagas/todas')
        .then(response => response.json())
        .then(data => {
            console.log("Dados recebidos:", data);
            renderVagas(data);
        })
        .catch(error => console.error('Erro ao buscar vagas:', error));
}

// Função para buscar e exibir candidaturas do usuário logado
function fetchCandidaturas() {
    const idGarcom = localStorage.getItem("userId");

    if (!idGarcom) {
        console.error("ID do garçom não encontrado no localStorage.");
        alert("Erro: ID do garçom não encontrado.");
        return;
    }

    console.log("Buscando candidaturas para idGarcom:", idGarcom);

    fetch(`http://localhost:8080/api/candidaturas/garcom/${idGarcom}`)
        .then(response => response.json())
        .then(data => {
            console.log("Candidaturas recebidas:", data);
            renderCandidaturas(data);
        })
        .catch(error => console.error('Erro ao buscar candidaturas:', error));
}

// Função para renderizar as candidaturas na div correspondente
function renderCandidaturas(candidaturas) {
    const container = document.getElementById('forCandidatura');

    if (!container) {
        console.error("O elemento com ID 'forCandidatura' não foi encontrado.");
        return;
    }

    container.innerHTML = ''; // Limpa o conteúdo atual

    if (candidaturas.length === 0) {
        container.innerHTML = "<p>Nenhuma candidatura encontrada.</p>";
        return;
    }

    candidaturas.forEach(candidatura => {
        const candidaturaDiv = document.createElement('div');
        candidaturaDiv.className = 'candidatura';

        // Formatação dos dados de exibição da candidatura
        const candidaturaContent = `
            <div class="candidatura-subdiv">
                <h2>Cargo: ${candidatura.cargo}</h2>
                <p><strong>Status:</strong> ${candidatura.status}</p>
                <p><strong>Endereço:</strong> ${candidatura.rua}, ${candidatura.numero} - ${candidatura.bairro}, CEP: ${candidatura.cep}</p>
                <p><strong>Buffet:</strong> ${candidatura.nomeBuffet}</p>
            </div>
        `;
        candidaturaDiv.innerHTML = candidaturaContent;

        container.appendChild(candidaturaDiv);
    });
}

// Função para renderizar as vagas na div correspondente
function renderVagas(vagas) {
    const container = document.getElementById('candidatosContainer');

    if (!container) {
        console.error("O elemento com ID 'candidatosContainer' não foi encontrado.");
        return;
    }

    container.innerHTML = ''; // Limpa o conteúdo atual

    // Filtra as vagas para exibir apenas as que têm status "aberta"
    const vagasFiltradas = vagas.filter(vaga => {
        console.log("Status da vaga:", vaga.status); // Log do status da vaga para debug
        return vaga.status === "aberta";
    });

    console.log("Vagas filtradas:", vagasFiltradas);

    if (vagasFiltradas.length === 0) {
        container.innerHTML = "<p>Nenhuma vaga disponível no momento.</p>";
        return;
    }

    vagasFiltradas.forEach(vaga => {
        const idVaga = vaga.idVaga;

        const vagaDiv = document.createElement('div');
        vagaDiv.className = 'vaga';

        const vagaContent = `
            <h2>Cargo: ${vaga.cargo}</h2>
            <p><strong>Buffet:</strong> ${vaga.nomeBuffet}</p>
            <p><strong>Idade Mínima:</strong> ${vaga.idadeMinima} anos</p> 
            <p><strong>Descrição:</strong> ${vaga.descricaoVaga}</p>
            <p><strong>Experiência Prévia:</strong> ${vaga.experienciaPrevia}</p>
            <p><strong>Qualificações:</strong> ${vaga.qualificacoesProcuradas}</p>
            <p><strong>Habilidades:</strong> ${vaga.habilidadesExigidas}</p>
            <p><strong>Atuação:</strong> ${vaga.atuacao}</p>
            <p><strong>Salário:</strong> R$ ${vaga.salario}</p>
            <p><strong>Benefícios:</strong> ${vaga.beneficios}</p>
            <p><strong>Endereço:</strong> ${vaga.rua}, ${vaga.numero} - ${vaga.bairro}, CEP: ${vaga.cep}</p>
            <p><strong>Jornada de Trabalho:</strong> ${vaga.jornadaTrabalho}</p>
        `;
        vagaDiv.innerHTML = vagaContent;

        const candidatarButton = document.createElement('button');
        candidatarButton.className = 'candidatar-button';
        candidatarButton.textContent = 'Candidatar-se';

        candidatarButton.addEventListener('click', () => {
            const idGarcom = localStorage.getItem("userId");
            if (idGarcom && idVaga) {
                candidatarSe(idGarcom, idVaga);
            } else {
                console.error("ID do garçom ou da vaga não definido.");
                alert("Erro ao se candidatar: ID do garçom ou da vaga não encontrado.");
            }
        });

        vagaDiv.appendChild(candidatarButton);
        container.appendChild(vagaDiv);
    });
}

// Função para renderizar as candidaturas na div correspondente
function renderCandidaturas(candidaturas) {
    const container = document.getElementById('forCandidatura');

    if (!container) {
        console.error("O elemento com ID 'forCandidatura' não foi encontrado.");
        return;
    }

    container.innerHTML = ''; // Limpa o conteúdo atual

    if (candidaturas.length === 0) {
        container.innerHTML = "<p>Nenhuma candidatura encontrada.</p>";
        return;
    }

    candidaturas.forEach(candidatura => {
        const candidaturaDiv = document.createElement('div');
        candidaturaDiv.className = 'candidatura';

        // Formatação dos dados de exibição da candidatura
        const candidaturaContent = `
            <div class="candidatura-subdiv">
                <h2>Cargo: ${candidatura.cargo}</h2>
                <p><strong>Status:</strong> ${candidatura.status}</p>
                <p><strong>Endereço:</strong> ${candidatura.rua}, ${candidatura.numero} - ${candidatura.bairro}, CEP: ${candidatura.cep}</p>
                <p><strong>Buffet:</strong> ${candidatura.nomeBuffet}</p>
                <p><strong>Salário:</strong> R$ ${candidatura.salario}</p>
                <p><strong>Jornada de Trabalho:</strong> ${candidatura.jornadaTrabalho}</p>
            </div>
        `;
        candidaturaDiv.innerHTML = candidaturaContent;

        container.appendChild(candidaturaDiv);
    });
}

// Função para se candidatar a uma vaga específica
function candidatarSe(idGarcom, idVaga) {
    console.log("Tentando se candidatar com idGarcom:", idGarcom, "e idVaga:", idVaga);
    
    fetch(`http://localhost:8080/api/candidaturas/candidatar-se?idGarcom=${idGarcom}&idVaga=${idVaga}`, {
        method: 'POST'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Candidatura realizada com sucesso:", data);
        alert("Candidatura realizada com sucesso!");
    })
    .catch(error => {
        console.error('Erro ao candidatar-se:', error);
        alert(`Erro ao candidatar-se: ${error.message}`);
    });
}

// Função para buscar e destacar a palavra na tela
function search() {
    const query = document.getElementById("searchBar").value.trim().toLowerCase(); // Termo de busca

    if (!query) {
        alert("Por favor, insira um termo para busca.");
        return;
    }

    // Remove destaques anteriores
    document.querySelectorAll('.highlight').forEach(element => {
        element.outerHTML = element.innerHTML; // Remove o span de destaque mantendo o texto original
    });

    const elements = document.querySelectorAll('body *:not(script):not(style)'); // Seleciona todos os elementos visíveis
    let found = false;

    elements.forEach(element => {
        // Verifica se o elemento possui texto e se contém o termo buscado
        if (element.innerText && element.innerText.toLowerCase().includes(query)) {
            const regex = new RegExp(`(${query})`, 'gi'); // Cria uma expressão regular para o termo de busca

            // Substitui o termo pelo mesmo termo envolvido em uma span de destaque
            element.innerHTML = element.innerHTML.replace(regex, '<span class="highlight">$1</span>');

            // Rola até o primeiro elemento encontrado e define `found` como true
            if (!found) {
                document.querySelector('.highlight').scrollIntoView({ behavior: 'smooth', block: 'center' });
                found = true;
            }
        }
    });

    // Se não houver correspondências
    if (!found) {
        alert("Nenhum item correspondente encontrado.");
    }
}

// Evento de busca
document.getElementById("searchButton").addEventListener("click", searchAndHighlight);

// CSS para o destaque
const style = document.createElement('style');
style.innerHTML = `
    .highlight {
        background-color: yellow;
        font-weight: bold;
        color: red;
    }
`;
document.head.appendChild(style);
