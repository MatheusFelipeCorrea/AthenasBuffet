document.getElementById('eventForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    console.log("Formulário enviado.");

    // Captura o ID do buffet da URL
    const buffetId = new URLSearchParams(window.location.search).get("buffetId");
    if (!buffetId) {
        console.error("ID do buffet não encontrado na URL.");
        alert("ID do buffet não encontrado na URL. Verifique se o parâmetro 'buffetId' está presente.");
        return;
    }
    console.log("ID do buffet capturado:", buffetId);

    // Captura o ID do cliente do localStorage
    const userId = localStorage.getItem("userId");
    if (!userId) {
        console.error("ID do cliente não encontrado no localStorage.");
        alert("ID do cliente não encontrado no localStorage. Verifique se o usuário está logado.");
        return;
    }
    console.log("ID do cliente capturado:", userId);

    const formData = new FormData(event.target);

    // Obtém os serviços adicionais selecionados e transforma em uma string separada por vírgulas
    const outrosServicosSelecionados = Array.from(document.querySelectorAll('input[name="outros_servicos"]:checked'))
                                            .map(checkbox => checkbox.value)
                                            .join(", ");
    console.log("Outros serviços selecionados (string):", outrosServicosSelecionados);

    // Monta o objeto de dados para enviar
    const data = {
        tipoEvento: formData.get("tipo"),
        data: formData.get("data"),
        horario: formData.get("horario"),
        duracao: parseInt(formData.get("duracao")),
        numeroConvidados: parseInt(formData.get("convidados")),
        cep: formData.get("cep"),
        logradouro: formData.get("logradouro"),
        numero: parseInt(formData.get("numero")),
        complemento: formData.get("complemento"),
        estado: formData.get("estado"),
        bairro: formData.get("bairro"),
        cidade: formData.get("cidade"),
        precisaOrcamentoMenu: formData.get("orcamento_menu") === "Sim",
        equipamento: formData.get("equipamento"),
        orcamentoMaximo: parseFloat(formData.get("orcamento_maximo")),
        outrosServicos: outrosServicosSelecionados,  // Enviado como string única
        temaEvento: formData.get("tema_evento") === "true"
    };

    console.log("Dados do formulário a serem enviados:", data);

    try {
        const response = await fetch(`http://127.0.0.1:8080/api/formularios/criar?idBuffet=${buffetId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "userId": userId
            },
            body: JSON.stringify(data)
        });

        console.log("Resposta do servidor:", response);

        if (response.ok) {
            const responseBody = await response.json();
            console.log("Formulário enviado com sucesso.", responseBody);
        
            if (!responseBody.idEvento) {
                console.error("ID do evento não encontrado na resposta do servidor.");
                alert("Erro ao processar o evento. Contate o suporte.");
                return;
            }
        
            alert("Formulário enviado com sucesso!");
        
            if (data.precisaOrcamentoMenu) {
                const eventoId = responseBody.idEvento;
                window.location.href = `../Menu/Menu.html?buffetId=${buffetId}&eventoId=${eventoId}`;
            } else {
                window.location.href = '../Acompanhe_Pedido2/Acompanhe_Pedido_2.html';
            }
        } else {
            const errorText = await response.text();
            console.error("Erro ao enviar o formulário:", errorText);
            alert("Erro ao enviar o formulário. Detalhes: " + errorText);
        }
        
    } catch (error) {
        console.error("Erro ao enviar os dados:", error);
        alert("Erro ao enviar os dados. Verifique o console para mais detalhes.");
    }
});

// Função para buscar o endereço usando a API ViaCEP
function buscarEndereco() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    console.log("CEP inserido:", cep);

    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                console.log("Dados do ViaCEP recebidos:", data);
                if (!data.erro) {
                    document.getElementById('logradouro').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('cidade').value = data.localidade;
                    document.getElementById('estado').value = data.uf;
                    console.log("Endereço preenchido com sucesso.");
                } else {
                    console.warn('CEP não encontrado.');
                    alert('CEP não encontrado.');
                }
            })
            .catch(error => {
                console.error("Erro ao buscar o CEP:", error);
                alert('Erro ao buscar o CEP.');
            });
    } else {
        console.warn("CEP inválido inserido.");
        alert('CEP inválido.');
    }
}
