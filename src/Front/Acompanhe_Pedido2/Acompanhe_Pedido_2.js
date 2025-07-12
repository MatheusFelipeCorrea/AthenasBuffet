document.addEventListener("DOMContentLoaded", function () {
    const idCliente = localStorage.getItem('userId');

    if (!idCliente) {
        alert("ID do cliente não encontrado. Por favor, faça login novamente.");
        return;
    }

    console.log("ID do cliente logado:", idCliente);

    function fetchEventosCliente() {
        fetch(`http://localhost:8080/api/formularios/eventos/cliente?idCliente=${idCliente}`)
            .then(response => {
                if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
                return response.json();
            })
            .then(data => {
                console.log("Dados de eventos recebidos:", data);
                renderEventos(data);
                fetchOrcamentos(idCliente);
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
            eventoDiv.id = `evento-${evento.idEvento}`;
    
            const precisaOrcamentoMenu = evento.precisaOrcamentoMenu ? 'Sim' : 'Não';
            const outrosServicos = evento.outrosServicos || "Nenhum serviço adicional";
    
            let eventoContent = `
                <h3>Evento: ${evento.tipoEvento || 'Não especificado'}</h3>
                <p><strong>Status:</strong> ${evento.status || 'Ativo'}</p>
                <p><strong>Data:</strong> ${evento.data || 'Não especificado'}</p>
                <p><strong>Horário:</strong> ${evento.horario || 'Não especificado'}</p>
                <p><strong>Duração:</strong> ${evento.duracao} horas</p>
                <p><strong>Convidados:</strong> ${evento.numeroConvidados} convidados</p>
                <p><strong>Equipamento:</strong> ${evento.equipamento || 'Não especificado'}</p>
                <p><strong>Orçamento Evento:</strong> ${
                    evento.orcamento !== null && evento.orcamento !== undefined 
                        ? `R$${evento.orcamento.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                        : 'Pendente'
                }</p>
                <p><strong>Orçamento Máximo:</strong> ${
                    evento.orcamentoMaximo !== null && evento.orcamentoMaximo !== undefined 
                        ? `R$${evento.orcamentoMaximo.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                        : 'Não especificado'
                }</p>
                <p><strong>Serviços Adicionais:</strong> ${outrosServicos}</p>
                <p><strong>Precisa de Orçamento de Menu:</strong> ${precisaOrcamentoMenu}</p>
                <p><strong>Endereço:</strong> ${evento.logradouro}, ${evento.numero} ${evento.complemento || ''} - ${evento.bairro}, ${evento.cidade} - ${evento.estado}, CEP: ${evento.cep}</p>
            `;
    
            eventoDiv.innerHTML = eventoContent;
    
            // Condicional para botões de status
            if (evento.status !== 'Concluído' && evento.status !== 'Cancelado') {
                const statusButtonsDiv = document.createElement('div');
                statusButtonsDiv.className = 'status-buttons';
    
                const btnCancelar = document.createElement('button');
                btnCancelar.className = 'cancelar';
                btnCancelar.innerText = 'Cancelar';
                btnCancelar.onclick = () => atualizarStatusEvento(evento.idEvento, 'Cancelado');
    
                const btnConcluido = document.createElement('button');
                btnConcluido.className = 'concluido';
                btnConcluido.innerText = 'Concluído';
                btnConcluido.onclick = () => atualizarStatusEvento(evento.idEvento, 'Concluído');
    
                statusButtonsDiv.appendChild(btnCancelar);
                statusButtonsDiv.appendChild(btnConcluido);
                eventoDiv.appendChild(statusButtonsDiv);
            } else if (evento.status === 'Concluído') {
                // Criar contêiner de feedback
                const feedbackContainer = document.createElement('div');
                feedbackContainer.className = 'feedback-container';
    
                // Adicionar placeholders para avaliação e resposta
                const avaliacaoSpan = document.createElement('span');
                avaliacaoSpan.className = 'avaliacao';
                avaliacaoSpan.textContent = 'Carregando avaliação...';
    
                const estrelaLink = document.createElement('a');
                estrelaLink.href = `../FORMULARIO_FEEDBACK/FORMULARIO_FEEDBACK/Formulario_Feedback.html?idEvento=${evento.idEvento}`;
                estrelaLink.className = 'estrela-avaliacao';
                estrelaLink.innerHTML = '⭐';
    
                const respostaSpan = document.createElement('span');
                respostaSpan.className = 'resposta';
                respostaSpan.textContent = 'Carregando resposta...';
    
                feedbackContainer.appendChild(avaliacaoSpan);
                feedbackContainer.appendChild(estrelaLink);
                feedbackContainer.appendChild(respostaSpan);
                eventoDiv.appendChild(feedbackContainer);
    
                // Buscar avaliação e resposta do feedback
                fetch(`http://localhost:8080/api/feedback/evento/${evento.idEvento}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Erro ao buscar avaliação para evento ID ${evento.idEvento}`);
                        }
                        return response.json();
                    })
                    .then(feedback => {
                        if (feedback) {
                            avaliacaoSpan.textContent = feedback.avaliacao 
                                ? `Avaliação: ${feedback.avaliacao}` 
                                : 'Avaliação Pendente';
                            respostaSpan.textContent = feedback.respostaBuffet === 'Não há resposta ainda' 
                                ? 'Não Respondido' 
                                : 'Respondido';
                        } else {
                            avaliacaoSpan.textContent = 'Avaliação Pendente';
                            respostaSpan.textContent = 'Não Respondido';
                        }
                    })
                    .catch(error => {
                        console.error(`Erro ao carregar avaliação para evento ID ${evento.idEvento}:`, error);
                        avaliacaoSpan.textContent = 'Avaliação Pendente';
                        respostaSpan.textContent = 'Não Respondido';
                    });
            }
    
            const orcamentosDiv = document.createElement('div');
            orcamentosDiv.id = `orcamentos-evento-${evento.idEvento}`;
            orcamentosDiv.className = 'orcamentos-container';
            orcamentosDiv.innerHTML = '<h4>Orçamentos de menu:</h4>';
    
            eventoDiv.appendChild(orcamentosDiv);
            container.appendChild(eventoDiv);
    
            console.log(`Div de orçamentos criada para evento ID: ${evento.idEvento}`);
        });
    }
    
    

    function atualizarStatusEvento(eventoId, novoStatus) {
        console.log(`Atualizando status do evento ID: ${eventoId} para: ${novoStatus}`);
        
        fetch(`http://localhost:8080/api/formularios/${eventoId}/atualizar-status`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: novoStatus })
        })
            .then(response => {
                if (!response.ok) throw new Error('Erro ao atualizar o status do evento');
                return response.text();
            })
            .then(message => {
                alert(message);
                fetchEventosCliente(); // Atualiza a lista de eventos após a alteração
            })
            .catch(error => {
                console.error('Erro ao atualizar o status do evento:', error);
                alert("Erro ao atualizar o status do evento.");
            });
    }

    function fetchOrcamentos(idCliente) {
        console.log("Buscando orçamentos para o cliente com ID:", idCliente);

        fetch(`http://localhost:8080/api/orcamentos/cliente?idCliente=${idCliente}`)
            .then(response => {
                if (!response.ok) throw new Error('Erro ao buscar orçamentos');
                return response.json();
            })
            .then(orcamentos => {
                console.log("Orçamentos recebidos:", orcamentos);
                renderOrcamentos(orcamentos);
            })
            .catch(error => console.error('Erro ao buscar orçamentos:', error));
    }

    function renderOrcamentos(orcamentos) {
        orcamentos.forEach(orcamento => {
            const eventoId = orcamento.idEvento;
            const idOrcamento = orcamento.idOrcamentoRestaurante;

            if (!eventoId || !idOrcamento) {
                console.error("Orçamento com idEvento ou idOrcamento undefined:", orcamento);
                return;
            }

            const orcamentosDiv = document.getElementById(`orcamentos-evento-${eventoId}`);

            if (orcamentosDiv) {
                const orcamentoContent = `
                    <div class="orcamento-restaurante">
                        <h3>Nome do Restaurante: ${orcamento.nomeRestaurante}</h3>
                        <p><strong>CNPJ do Restaurante:</strong> ${orcamento.cnpjRestaurante}</p>
                        <p><strong>Endereço do Restaurante:</strong> ${orcamento.ruaRestaurante}, ${orcamento.numeroRestaurante} - CEP: ${orcamento.cepRestaurante}</p>
                        <p><strong>Telefone do Restaurante:</strong> ${orcamento.telefoneRestaurante}</p>
                        <p><strong>Preço:</strong> R$ ${orcamento.precoRestaurante.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <p><strong>Status:</strong> ${orcamento.status}</p>
                        ${orcamento.status === 'Aceito' || orcamento.status === 'Recusado' ? '' : `
                        <button class="aceitar" onclick="atualizarStatusOrcamento(${idOrcamento}, 'Aceito')">Aceitar</button>
                        <button class="recusar" onclick="atualizarStatusOrcamento(${idOrcamento}, 'Recusado')">Recusar</button>
                        `}
                    </div>
                `;
                orcamentosDiv.innerHTML += orcamentoContent;
            } else {
                console.warn(`Div de orçamentos não encontrada para evento ${eventoId}`);
            }
        });
    }

    window.atualizarStatusOrcamento = function (idOrcamento, novoStatus) {
        console.log(`Atualizando status do orçamento ID: ${idOrcamento} para: ${novoStatus}`);
        
        fetch(`http://localhost:8080/api/orcamentos/${idOrcamento}/atualizarStatus?status=${novoStatus}`, {
            method: 'POST'
        })
            .then(response => {
                if (!response.ok) throw new Error('Erro ao atualizar o status do orçamento');
                return response.text();
            })
            .then(message => {
                alert(message);
                fetchOrcamentos(idCliente); 
                location.reload()
            })
            .catch(error => {
                console.error('Erro ao atualizar o status do orçamento:', error);
                alert("Erro ao atualizar o status do orçamento.");
            });
    };

    fetchEventosCliente();
});
