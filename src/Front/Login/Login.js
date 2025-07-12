const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const radioButtons = document.querySelectorAll('input[name="identificador"]');
const nomeInput = document.getElementById('nome');
const cpfInput = document.getElementById('cpf');

// Função para alterar os placeholders dinamicamente
function updateFields() {
    const selectedType = document.querySelector('input[name="identificador"]:checked').value;

    if (selectedType === "Buffet" || selectedType === "Restaurante") {
        nomeInput.placeholder = "Nome Estabelecimento";
        cpfInput.placeholder = "CNPJ";
    } else {
        nomeInput.placeholder = "Nome Completo";
        cpfInput.placeholder = "CPF";
    }
}

// Evento para alternar entre login e cadastro
signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

// Atualiza os placeholders ao selecionar o tipo de usuário
radioButtons.forEach(radio => {
    radio.addEventListener('change', updateFields);
});

// Função para enviar os dados de cadastro
async function register(event) {
    event.preventDefault();  // Evita o comportamento padrão do formulário

    // Coletando os valores dos campos
    const nome = document.getElementById('nome').value;
    const email = document.querySelector('.sign-up-container input[placeholder="Email"]').value;
    const senha = document.querySelector('.sign-up-container input[placeholder="Senha"]').value;
    const identificador = document.querySelector('.sign-up-container input[name="identificador"]:checked').value;

    // Diferencia o campo de identificação entre CPF e CNPJ
    const identificacao = identificador === "Buffet" ? { cnpj: document.getElementById('cpf').value } : { cpf: document.getElementById('cpf').value };
    
    // Novos campos adicionados
    const cep = document.querySelector('.sign-up-container input[placeholder="CEP"]').value;
    const rua = document.querySelector('.sign-up-container input[placeholder="Rua"]').value;
    const numero = document.querySelector('.sign-up-container input[placeholder="Número"]').value;
    const complemento = document.querySelector('.sign-up-container input[placeholder="Complemento"]').value;
    const telefone = document.querySelector('.sign-up-container input[placeholder="Telefone"]').value;
    const bairro = document.querySelector('.sign-up-container input[placeholder="Bairro"]').value;

    try {
        // Enviando a requisição ao backend com os novos dados
        const response = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                nome, email, senha, cep, identificador, rua, numero, complemento, telefone, bairro, ...identificacao 
            })
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            document.querySelector('.sign-up-container form').reset();  // Limpa o formulário
            container.classList.remove('right-panel-active');  // Volta para o login
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('Erro ao tentar fazer o cadastro.');
    }
}

// Função para enviar os dados de login
async function login(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    const email = document.querySelector('.sign-in-container input[placeholder="Email"]').value;
    const password = document.querySelector('.sign-in-container input[placeholder="Senha"]').value;
    const identificador = document.querySelector('.sign-in-container input[name="identificador"]:checked').value;

    try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, identificador })
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);

            // Salva o ID do usuário e o status de login no localStorage
            localStorage.setItem('userId', result.userId);  // Salva o ID do usuário
            localStorage.setItem('userIdentifier', identificador);  // Salva o identificador do usuário
            localStorage.setItem('userLoggedIn', 'true'); // Define o status de login como 'true'
            console.log('ID e identificador do usuário salvos:', localStorage.getItem('userId'), localStorage.getItem('userIdentifier'));

            // Redireciona para a página Home
            window.location.href = "../Home/Home.html";
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao tentar fazer login.');
    }
}

// Função de logout para remover o ID do usuário do localStorage
function logout() {
    localStorage.removeItem('userId');  // Remove o ID do usuário do localStorage
    console.log('Usuário deslogado. ID removido do localStorage.');
    window.location.href = "../Login/Login.html";  // Redireciona para a página de login
}

// Adiciona eventos de submit aos formulários
document.querySelector('.sign-in-container form').addEventListener('submit', login);
document.querySelector('.sign-up-container form').addEventListener('submit', register);
