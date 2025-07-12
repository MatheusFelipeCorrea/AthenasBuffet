document.addEventListener('DOMContentLoaded', function () {
    // Função para capturar os parâmetros da URL
    function getParamsFromURL() {
      const urlParams = new URLSearchParams(window.location.search);
      console.log("Parâmetros da URL:", window.location.search); // Log para verificar os parâmetros
      return {
        eventId: urlParams.get('eventoId'), // Captura 'eventoId'
        clientId: urlParams.get('idCliente') // Captura 'idCliente'
      };
    }
  
    const { eventId, clientId } = getParamsFromURL();
    console.log("EventoId capturado da URL:", eventId);
    console.log("IdCliente capturado da URL:", clientId);
  
    // Valida se o idCliente está presente
    if (!clientId) {
      alert("ID do cliente não encontrado na URL. Por favor, revise o link ou faça login novamente.");
      return;
    }
  
    // Busca os dados do cliente para preencher o formulário automaticamente
    function fetchClientData(clientId) {
      fetch(`http://localhost:8080/api/clientes/${clientId}`) // Endpoint de busca do cliente
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erro ao buscar dados do cliente: ${response.status}`);
          }
          return response.json();
        })
        .then(cliente => {
          console.log("Dados do cliente recebidos:", cliente);
  
          // Preenche os campos de nome e CPF
          document.getElementById('nomeCliente').value = cliente.nome || '';
          document.getElementById('cpfCliente').value = cliente.cpf || '';
        })
        .catch(error => {
          console.error('Erro ao buscar os dados do cliente:', error);
          alert('Erro ao buscar os dados do cliente. Tente novamente mais tarde.');
        });
    }
  
    // Busca os dados do cliente ao carregar a página
    fetchClientData(clientId);
  
    // Adiciona o evento de submit ao formulário
    document.getElementById('budgetForm').addEventListener('submit', function (event) {
      event.preventDefault();
  
      // Captura o userId do local storage
      const userId = localStorage.getItem('userId');
  
      if (!userId) {
        alert("ID do usuário não encontrado. Por favor, faça login novamente.");
        return;
      }
  
      console.log("userId capturado do Local Storage:", userId);
  
      // Captura os dados dos campos do formulário
      const dados = {
        nomeCliente: document.getElementById('nomeCliente').value,
        cpfCliente: document.getElementById('cpfCliente').value,
        nomeRestaurante: document.getElementById('nomeRestaurante').value,
        cnpjRestaurante: document.getElementById('cnpjRestaurante').value,
        cepRestaurante: document.getElementById('cepRestaurante').value,
        ruaRestaurante: document.getElementById('ruaRestaurante').value,
        numeroRestaurante: document.getElementById('numeroRestaurante').value,
        telefoneRestaurante: document.getElementById('telefoneRestaurante').value,
        precoRestaurante: document.getElementById('precoRestaurante').value,
        idBuffet: userId, // Inclui o ID do buffet (usuário logado)
        idEvento: eventId // Inclui o ID do evento capturado da URL
      };
  
      console.log("Dados a serem enviados ao backend:", dados);
  
      // Envia os dados para o backend usando Fetch API
      fetch('http://localhost:8080/api/EnviarOrcamentoRestaurante', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      })
        .then(response => {
          if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
          }
          return response.text();
        })
        .then(data => {
          document.getElementById('message').style.display = 'block';
          document.getElementById('message').textContent = data;
          console.log(data);
        })
        .catch(error => {
          document.getElementById('message').style.display = 'block';
          document.getElementById('message').textContent = error.message;
          console.error('Erro:', error);
        });
    });
  });
  