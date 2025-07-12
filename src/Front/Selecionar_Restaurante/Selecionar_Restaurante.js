// script.js

// Função para carregar mais buffets
document.querySelector(".load-more").addEventListener("click", function() {
    alert("Carregar mais buffets!");
    // Adicione aqui a lógica para carregar mais itens
});

document.addEventListener("DOMContentLoaded", function() {
    const buffets = [
        { name: "Sabor à Italiana", category: "Casamentos", rating: 4.9, distance: "5 km", img: "@" },
        { name: "Tokyo", category: "Formaturas", rating: 5.0, distance: "5 km", img: "@" },
        // Adicione outros buffets conforme necessário
    ];

    const buffetList = document.getElementById("buffet-list");

    function renderBuffets() {
        buffetList.innerHTML = "";

        buffets.forEach((buffet, index) => {
            const buffetItem = document.createElement("div");
            buffetItem.classList.add("buffet-item");
            buffetItem.dataset.index = index;

            buffetItem.innerHTML = `
                <img src="${buffet.img}" alt="Imagem do Buffet">
                <div class="buffet-info">
                    <h2>${buffet.name}</h2>
                    <p>${buffet.category}</p>
                    <p>⭐ ${buffet.rating}</p>
                    <p>📍 ${buffet.distance}</p>
                </div>
            `;

            // Adiciona evento de clique para seleção do buffet
            buffetItem.addEventListener("click", () => selectBuffet(index));

            buffetList.appendChild(buffetItem);
        });
    }

    function selectBuffet(index) {
        // Remove a seleção de todos os buffets
        document.querySelectorAll(".buffet-item").forEach(item => {
            item.classList.remove("selected");
        });

        // Adiciona a classe 'selected' ao buffet escolhido
        const selectedBuffet = document.querySelector(`.buffet-item[data-index='${index}']`);
        selectedBuffet.classList.add("selected");
        
        // Lógica adicional pode ser implementada aqui, como salvar a seleção no banco de dados ou exibir detalhes
    }

    renderBuffets();
});
