function showForm(formType) {
    console.log("Mostrando formulário:", formType); 

    // Oculta todos os formulários
    document.getElementById("formEvent").classList.add("hidden");
    document.getElementById("formMenu").classList.add("hidden");
    document.getElementById("formCandidatos").classList.add("hidden");

    // Exibe o formulário selecionado
    if (formType === "event") {
        document.getElementById("formEvent").classList.remove("hidden");
        fetchEventos();
    } else if (formType === "candidatos") {
        document.getElementById("formCandidatos").classList.remove("hidden");
        fetchVagas(); 
    } else if (formType === "menu") {
        document.getElementById("formMenu").classList.remove("hidden");
        fetchMenus(); // Buscar menus
    }
    
}

function fetchEventos() {
    console.log("Chamando fetchEventos");

    const idBuffet = localStorage.getItem('userId');
    if (!idBuffet) {
        console.error("ID do buffet não encontrado no localStorage.");
        alert("Erro: ID do buffet não encontrado.");
        return;
    }

    fetch(`http://localhost:8080/api/formularios/eventos?idBuffet=${idBuffet}`)
        .then(response => {
            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log("Dados de eventos recebidos:", data);
            renderEventos(data);
        })
        .catch(error => console.error('Erro ao buscar eventos:', error));
}

function renderEventos(eventos) {
    const container = document.getElementById('eventosContainer');
    if (!container) {
        console.error("Elemento 'eventosContainer' não encontrado.");
        return;
    }

    container.innerHTML = '';

    eventos.forEach(evento => {
        const eventoDiv = document.createElement('div');
        eventoDiv.className = 'evento';

        const precisaOrcamentoMenu = evento.precisaOrcamentoMenu ? 'Sim' : 'Não';
        const outrosServicos = evento.outrosServicos || "Nenhum serviço adicional";

        let eventoContent = `
            <p><strong>Cliente:</strong> ${evento.nomeCliente || 'Não especificado'}</p>
            <p><strong>Status:</strong> ${evento.status || 'Ativo'}</p>
            <p><strong>Horário:</strong> ${evento.horario || 'Não especificado'}</p>
            <p><strong>Data:</strong> ${evento.data || 'Não especificado'}</p>
            <p><strong>Tipo:</strong> ${evento.tipoEvento || 'Não especificado'}</p>
            <p><strong>Duração:</strong> ${evento.duracao} horas</p>
            <p><strong>Convidados:</strong> ${evento.numeroConvidados} convidados</p>
            <p><strong>Equipamento:</strong> ${evento.equipamento || 'Não especificado'}</p>
            <p><strong>Orçamento Máximo:</strong> R$${evento.orcamentoMaximo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            <p><strong>Serviços Adicionais:</strong> ${outrosServicos}</p>
            <p><strong>Precisa de Orçamento de Menu:</strong> ${precisaOrcamentoMenu}</p>
            <p><strong>Endereço:</strong> ${evento.logradouro}, ${evento.numero} ${evento.complemento || ''} - ${evento.bairro}, ${evento.cidade} - ${evento.estado}, CEP: ${evento.cep}</p>
        `;

        eventoDiv.innerHTML = eventoContent;

        // Verificar se o feedback existe para o evento
        verificarFeedback(evento.idEvento, eventoDiv);

        container.appendChild(eventoDiv);



        function verificarFeedback(eventoId, eventoDiv) {
            fetch(`http://localhost:8080/api/feedback/existe?eventoId=${eventoId}`)
                .then(response => {
                    if (!response.ok) throw new Error(`Erro ao verificar feedback para o evento ID: ${eventoId}`);
                    return response.json();
                })
                .then(data => {
                    if (data.existe) {
                        // Se o feedback existe, buscar os detalhes para obter a avaliação
                        fetch(`http://localhost:8080/api/feedback/evento/${eventoId}`)
                            .then(response => {
                                if (!response.ok) throw new Error(`Erro ao buscar detalhes do feedback para o evento ID: ${eventoId}`);
                                return response.json();
                            })
                            .then(feedback => {
                                const estrelaContainer = document.createElement('div');
                                estrelaContainer.className = 'estrela-container';
        
                                const avaliacaoSpan = document.createElement('span');
                                avaliacaoSpan.className = 'avaliacao';
                                avaliacaoSpan.textContent = feedback.avaliacao
                                    ? feedback.avaliacao.toFixed(2) // Duas casas decimais
                                    : 'N/A';
        
                                const estrelaLink = document.createElement('a');
                                estrelaLink.href = `../RESPONDER_FEEDBACK/RESPONDER_FEEDBACK/Responder_Feedback.html?idEvento=${eventoId}`;
                                estrelaLink.className = 'estrela-avaliacao';
                                estrelaLink.innerHTML = '⭐';
                                estrelaLink.title = 'Avaliar Evento';
        
                                // Adicionar avaliação primeiro e depois a estrela
                                estrelaContainer.appendChild(avaliacaoSpan);
                                estrelaContainer.appendChild(estrelaLink);
        
                                eventoDiv.appendChild(estrelaContainer);
                            })
                            .catch(error => console.error('Erro ao buscar detalhes do feedback:', error));
                    }
                })
                .catch(error => console.error('Erro ao verificar feedback:', error));
        }        
        
        // Exibir input de orçamento apenas se ainda não foi definido
        if (evento.orcamento === null || evento.orcamento === undefined || evento.orcamento === 0) {
            const orcamentoContainer = document.createElement('div');
            orcamentoContainer.className = 'orcamento-container';
            
            const orcamentoLabel = document.createElement('label');
            orcamentoLabel.textContent = "Orçamento:";
            
            const orcamentoInput = document.createElement('input');
            orcamentoInput.type = 'number';
            orcamentoInput.id = `input-orcamento-${evento.idEvento}`;
            orcamentoInput.placeholder = "Orçamento";
            
            const enviarButton = document.createElement('button');
            enviarButton.textContent = "Enviar";
            enviarButton.onclick = () => enviarOrcamento(evento.idEvento);

            orcamentoContainer.appendChild(orcamentoLabel);
            orcamentoContainer.appendChild(orcamentoInput);
            orcamentoContainer.appendChild(enviarButton);

            eventoDiv.appendChild(orcamentoContainer);
        } else {
            eventoDiv.innerHTML += `<p><strong>Orçamento:</strong> R$${evento.orcamento.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>`;
        }

        // Botão para enviar orçamento de menu
        if (evento.precisaOrcamentoMenu) {
            const orcamentoMenuButton = document.createElement('button');
            orcamentoMenuButton.className = "enviar-orcamento";
            orcamentoMenuButton.textContent = "Enviar Orçamento de Menu";
            orcamentoMenuButton.onclick = () => redirecionarEnviarOrcamento(evento.idEvento, evento.idCliente);
            eventoDiv.appendChild(orcamentoMenuButton);
        }
    

        container.appendChild(eventoDiv);
    });
}


function redirecionarEnviarOrcamento(eventoId, idCliente) {
    console.log(`Redirecionando para Enviar Orçamento de Menu com eventoId: ${eventoId} e idCliente: ${idCliente}`);
    window.location.href = `../Enviar_Orçamento_Menu/Enviar_Orcamento_Menu.html?eventoId=${eventoId}&idCliente=${idCliente}`;
}


function enviarOrcamento(eventoId) {
    const inputOrcamento = document.getElementById(`input-orcamento-${eventoId}`);
    if (!inputOrcamento) {
        console.error(`Input de orçamento não encontrado para o evento ID ${eventoId}`);
        return;
    }

    const orcamento = inputOrcamento.value;
    if (!orcamento) {
        alert("Por favor, insira um valor para o orçamento.");
        return;
    }

    console.log(`Enviando orçamento para eventoId: ${eventoId}, valor: ${orcamento}`);

    fetch(`http://localhost:8080/api/formularios/${eventoId}/atualizar-orcamento`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orcamento: parseFloat(orcamento) })
    })
    .then(response => {
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        return response.text();
    })
    .then(message => {
        alert(message);
        inputOrcamento.disabled = true;
        const enviarButton = inputOrcamento.nextElementSibling;
        if (enviarButton) enviarButton.disabled = true; 
    })
    .catch(error => {
        console.error('Erro ao enviar orçamento:', error);
        alert(`Erro ao enviar orçamento: ${error.message}`);
    });
}


function fetchVagas() {
    console.log("Chamando fetchVagas"); 

    const idBuffet = localStorage.getItem('userId'); 
    if (!idBuffet) {
        console.error("ID do buffet não encontrado no localStorage.");
        alert("Erro: ID do buffet não encontrado.");
        return;
    }

    fetch(`http://localhost:8080/api/vagas?idBuffet=${idBuffet}`)
        .then(response => {
            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log("Dados de vagas recebidos:", data); 
            renderVagas(data); 
        })
        .catch(error => console.error('Erro ao buscar vagas:', error));
}

function renderVagas(vagas) {
    const container = document.getElementById('candidatosContainer');
    if (!container) {
        console.error("Elemento 'candidatosContainer' não encontrado.");
        return;
    }

    container.innerHTML = ''; 

    vagas.forEach(vaga => {
        const vagaDiv = document.createElement('div');
        vagaDiv.className = 'vaga';

        const vagaContent = `
            <h2>Cargo: ${vaga.cargo}</h2>
            <p><strong>Descrição:</strong> ${vaga.descricaoVaga}</p>
            <p><strong>Data e Jornada de Trabalho:</strong> ${vaga.jornadaTrabalho}</p>
            <p><strong>Endereço:</strong> ${vaga.rua}, ${vaga.numero} - ${vaga.bairro}, CEP: ${vaga.cep}</p>
        `;
        vagaDiv.innerHTML = vagaContent;

        if (vaga.status !== "fechado") {
            const fecharVagaButton = document.createElement('button');
            fecharVagaButton.textContent = 'Fechar Vaga';
            fecharVagaButton.className = 'close-vaga-button';
            fecharVagaButton.onclick = () => fecharVaga(vaga.idVaga, vagaDiv);

            vagaDiv.appendChild(fecharVagaButton);
        }

        const candidatosDiv = document.createElement('div');
        candidatosDiv.className = 'candidatos';
        candidatosDiv.innerHTML = `<p><strong>Candidatos para esta vaga:</strong></p>`;

        fetchCandidatosPorVaga(vaga.idVaga, candidatosDiv);

        vagaDiv.appendChild(candidatosDiv);
        container.appendChild(vagaDiv);
    });
}

function fecharVaga(idVaga) {
    fetch(`http://localhost:8080/api/vagas/${idVaga}/fechar`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        return response.text(); 
    })
    .then(message => {
        alert(message);
        fetchVagas();
    })
    .catch(error => {
        console.error('Erro ao fechar a vaga:', error);
        alert(`Erro ao fechar a vaga: ${error.message}`);
    });
}

function fetchCandidatosPorVaga(idVaga, candidatosDiv) {
    console.log("Buscando candidatos para a vaga com id:", idVaga);

    fetch(`http://localhost:8080/api/candidaturas/vaga/${idVaga}`)
        .then(response => {
            if (response.status === 404) {
                console.log(`Nenhuma candidatura encontrada para a vaga ${idVaga}`);
                renderCandidatos([], candidatosDiv); 
                return [];
            }
            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
            return response.json();
        })
        .then(candidatos => {
            console.log(`Candidatos para a vaga ${idVaga}:`, candidatos);
            renderCandidatos(candidatos, candidatosDiv); 
        })
        .catch(error => {
            console.error(`Erro ao buscar candidatos para a vaga ${idVaga}:`, error);
        });
}


function renderCandidatos(candidatos, container) {
    // Limpar o container antes de adicionar novos candidatos
    container.innerHTML = "";

    if (candidatos.length === 0) {
        container.innerHTML += "<p>Ainda nenhum candidato para esta vaga.</p>";
        return;
    }

    candidatos.forEach(candidato => {
        const candidatoDiv = document.createElement('div');
        candidatoDiv.className = 'candidato-card';

        const candidatoContent = `
            <p><strong>Nome:</strong> ${candidato.nome}</p>
            <p><strong>Telefone:</strong> ${candidato.telefone}</p>
            <p><strong>Status:</strong> <span id="status-${candidato.idCandidatura}">${candidato.status}</span></p>
        `;
        candidatoDiv.innerHTML = candidatoContent;

        if (candidato.status === "Pendente") {
            const aceitarButton = document.createElement('button');
            aceitarButton.textContent = "Aceitar";
            aceitarButton.className = 'accept-button';
            aceitarButton.onclick = () => atualizarStatus(candidato.idCandidatura, "Aceito");

            const recusarButton = document.createElement('button');
            recusarButton.textContent = "Recusar";
            recusarButton.className = 'decline-button';
            recusarButton.onclick = () => atualizarStatus(candidato.idCandidatura, "Recusado");

            candidatoDiv.appendChild(aceitarButton);
            candidatoDiv.appendChild(recusarButton);
        }

        container.appendChild(candidatoDiv);
    });
}

function atualizarStatus(idCandidatura, novoStatus) {
    fetch(`http://localhost:8080/api/candidaturas/${idCandidatura}/atualizar-status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: novoStatus })
    })
    .then(response => {
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        return response.json();
    })
    .then(() => {
        document.getElementById(`status-${idCandidatura}`).textContent = novoStatus;

        const candidatoCard = document.getElementById(`status-${idCandidatura}`).parentElement.parentElement;
        candidatoCard.querySelectorAll('.accept-button, .decline-button').forEach(button => button.remove());
        alert(`Status atualizado para ${novoStatus}`);
    })
    .catch(error => {
        console.error('Erro ao atualizar o status:', error);
        alert(`Erro ao atualizar o status: ${error.message}`);
    });
}

function fetchMenus() {
    console.log("Buscando menus vinculados ao buffet.");

    const userId = localStorage.getItem('userId');
    if (!userId) {
        console.error("ID do buffet não encontrado no localStorage.");
        alert("Erro: ID do buffet não encontrado.");
        return;
    }

    fetch(`http://localhost:8080/api/menus/buffet/${userId}`)
        .then(response => {
            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
            return response.json();
        })
        .then(menus => {
            console.log("Menus recebidos:", menus);
            renderMenus(menus);
        })
        .catch(error => {
            console.error('Erro ao buscar menus:', error);
            alert("Erro ao buscar menus. Talvez você não tenha nenhuma requisição de menu ainda.");
        });
}

function renderMenus(menus) {
    const container = document.getElementById('menusContainer');
    if (!container) {
        console.error("Elemento 'menusContainer' não encontrado.");
        return;
    }

    container.innerHTML = '';

    if (menus.length === 0) {
        container.innerHTML = "<p>Não há menus cadastrados para este buffet.</p>";
        return;
    }

    menus.forEach(menu => {
        const menuDiv = document.createElement('div');
        menuDiv.className = 'menu-card';

        const menuContent = `
            <h3>Cliente: ${menu.nomeCliente}</h3>
            <p><strong>Data do Evento:</strong> ${menu.dataEvento || 'Não especificado'}</p>
            <p><strong>Tipo do Evento:</strong> ${menu.tipoEvento || 'Não especificado'}</p>
            <p><strong>Prato Principal:</strong> ${menu.pratoPrincipal}</p>
            <p><strong>Acompanhamento:</strong> ${menu.acompanhamento}</p>
            <p><strong>Sobremesa:</strong> ${menu.sobremesa}</p>
            <p><strong>Bebidas:</strong> ${menu.bebidas || 'Não especificado'}</p>
            <p><strong>Entrada:</strong> ${menu.entrada || 'Não especificado'}</p>
            <p><strong>Vegetariano:</strong> ${menu.vegetariano || 'Não especificado'}</p>
            <p><strong>Orçamento Máximo:</strong> R$${menu.orcamentoMaximo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            <p><strong>Observações:</strong> ${menu.observacoes || 'Nenhuma'}</p>
        `;
        
        menuDiv.innerHTML = menuContent;

        // Botão para enviar orçamento de menu
        const enviarOrcamentoMenuButton = document.createElement('button');
        enviarOrcamentoMenuButton.className = "enviar-orcamento";
        enviarOrcamentoMenuButton.textContent = "Enviar Orçamento de Menu";
        enviarOrcamentoMenuButton.onclick = () => {
            redirecionarEnviarOrcamento(menu.eventoId, menu.idCliente);
        };

        menuDiv.appendChild(enviarOrcamentoMenuButton);

        container.appendChild(menuDiv);
    });
}


function search() {
    const query = document.getElementById("searchBar").value.trim().toLowerCase(); 

    if (!query) {
        alert("Por favor, insira um termo para busca.");
        return;
    }

    document.querySelectorAll('.highlight').forEach(element => {
        element.outerHTML = element.innerHTML; 
    });

    const elements = document.querySelectorAll('body *:not(script):not(style)'); 
    let found = false;

    elements.forEach(element => {
        if (element.innerText && element.innerText.toLowerCase().includes(query)) {
            const regex = new RegExp(`(${query})`, 'gi'); 

            element.innerHTML = element.innerHTML.replace(regex, '<span class="highlight">$1</span>');

            if (!found) {
                document.querySelector('.highlight').scrollIntoView({ behavior: 'smooth', block: 'center' });
                found = true;
            }
        }
    });

    if (!found) {
        alert("Nenhum item correspondente encontrado.");
    }
}

document.getElementById("searchButton").addEventListener("click", search);

// Estilo para destaque de busca
const style = document.createElement('style');
style.innerHTML = `
    .highlight {
        background-color: yellow;
        font-weight: bold;
        color: red;
    }
`;
document.head.appendChild(style);
