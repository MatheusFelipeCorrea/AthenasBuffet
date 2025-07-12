document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const menuId = params.get("id");

    if (menuId) {
        // Carrega os detalhes do menu para a avaliação
        fetch(`http://localhost:8080/api/menu/${menuId}`)
            .then(response => response.json())
            .then(menu => {
                const main = document.getElementById("menu-avaliacao");
                main.innerHTML = `
                    <h2>Entradas</h2>
                    <ul>${menu.entradas.map(item => `<li>${item}</li>`).join('')}</ul>
                    <h2>Pratos Principais</h2>
                    <ul>${menu.pratosPrincipais.map(item => `<li>${item}</li>`).join('')}</ul>
                    <h2>Acompanhamentos</h2>
                    <ul>${menu.acompanhamentos.map(item => `<li>${item}</li>`).join('')}</ul>
                    <h2>Bebidas</h2>
                    <ul>${menu.bebidas.map(item => `<li>${item}</li>`).join('')}</ul>
                    <h2>Sobremesas</h2>
                    <ul>${menu.sobremesas.map(item => `<li>${item}</li>`).join('')}</ul>
                    <h2>Restrições</h2>
                    <p>${menu.restricoes || "Nenhuma"}</p>
                    <h2>Comentários</h2>
                    <p>${menu.comentarios || "Nenhum"}</p>
                `;
            })
            .catch(error => {
                document.getElementById("menu-avaliacao").textContent = "Erro ao carregar o menu.";
                console.error('Erro:', error);
            });
    } else {
        carregarMenus();
    }
});

// URL do back-end
const API_URL = 'http://localhost:8080/api/menu/listar';

// Função para criar os cards
function criarCard(menu) {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = menu.imagem || 'https://via.placeholder.com/250'; // Imagem padrão se não houver

    const titulo = document.createElement('h3');
    titulo.textContent = menu.nome;

    const descricao = document.createElement('p');
    descricao.textContent = menu.descricao;

    const detalhes = document.createElement('button');
    detalhes.textContent = 'Avaliar Menu';
    detalhes.onclick = () => redirecionarParaAvaliacao(menu.id);

    card.appendChild(img);
    card.appendChild(titulo);
    card.appendChild(descricao);
    card.appendChild(detalhes);

    return card;
}

// Função para carregar menus
function carregarMenus() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('menu-container');
            container.innerHTML = ''; // Limpa o container antes de adicionar os cards
            data.forEach(menu => {
                const card = criarCard(menu);
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Erro ao carregar menus:', error));
}

// Redireciona para a página de avaliação com o ID do menu
function redirecionarParaAvaliacao(menuId) {
    window.location.href = `menu-avaliacao.html?id=${menuId}`;
}
