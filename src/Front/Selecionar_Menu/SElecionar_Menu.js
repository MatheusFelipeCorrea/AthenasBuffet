const menuData = {
    entradas: [
        { nome: "Bruschetta", descricao: "Pão tostado com tomate e manjericão", imagem: "https://via.placeholder.com/150?text=Bruschetta" },
        { nome: "Mini Quiches", descricao: "Delicados quiches de queijo e presunto", imagem: "https://via.placeholder.com/150?text=Mini+Quiches" },
        { nome: "Tábua de Frios", descricao: "Seleção de queijos, presuntos e azeitonas", imagem: "https://via.placeholder.com/150?text=T%C3%A1bua+de+Frios" },
        { nome: "Canapés Variados", descricao: "Pequenos canapés com sabores diversos", imagem: "https://via.placeholder.com/150?text=Canap%C3%A9s+Variados" }
    ],
    pratosPrincipais: [
        { nome: "Filé ao Molho Madeira", descricao: "Filé mignon ao molho madeira acompanhado de arroz à grega", imagem: "https://via.placeholder.com/150?text=Fil%C3%A9+ao+Molho+Madeira" },
        { nome: "Frango Supreme", descricao: "Frango grelhado com molho de ervas finas e legumes sautée", imagem: "https://via.placeholder.com/150?text=Frango+Supreme" },
        { nome: "Salmão Grelhado", descricao: "Salmão ao molho de limão e ervas, acompanhado de risoto", imagem: "https://via.placeholder.com/150?text=Salm%C3%A3o+Grelhado" },
        { nome: "Ravioli ao Molho 4 Queijos", descricao: "Massa fresca recheada com ricota ao molho cremoso", imagem: "https://via.placeholder.com/150?text=Ravioli+4+Queijos" }
    ],
    acompanhamentos: [
        { nome: "Salada Caesar", descricao: "Alface romana com croutons e molho Caesar", imagem: "https://via.placeholder.com/150?text=Salada+Caesar" },
        { nome: "Batatas Rústicas", descricao: "Batatas assadas com ervas e especiarias", imagem: "https://via.placeholder.com/150?text=Batatas+R%C3%BAsticas" },
        { nome: "Arroz Piamontese", descricao: "Arroz cremoso com champignon e queijo parmesão", imagem: "https://via.placeholder.com/150?text=Arroz+Piamontese" },
        { nome: "Farofa de Banana", descricao: "Farofa crocante com pedaços de banana", imagem: "https://via.placeholder.com/150?text=Farofa+de+Banana" }
    ],
    bebidas: [
        { nome: "Suco Natural", descricao: "Opções de suco de laranja, limão ou manga", imagem: "https://via.placeholder.com/150?text=Suco+Natural" },
        { nome: "Refrigerante", descricao: "Coca-Cola, Guaraná e opções zero açúcar", imagem: "https://via.placeholder.com/150?text=Refrigerante" },
        { nome: "Vinho Tinto", descricao: "Vinho tinto seco ou suave para harmonizar", imagem: "https://via.placeholder.com/150?text=Vinho+Tinto" },
        { nome: "Cerveja Artesanal", descricao: "Seleção de cervejas artesanais premium", imagem: "https://via.placeholder.com/150?text=Cerveja+Artesanal" }
    ],
    sobremesas: [
        { nome: "Torta de Limão", descricao: "Torta com recheio cremoso de limão e cobertura de chantilly", imagem: "https://via.placeholder.com/150?text=Torta+de+Lim%C3%A3o" },
        { nome: "Brownie", descricao: "Brownie de chocolate com castanhas e cobertura de calda quente", imagem: "https://via.placeholder.com/150?text=Brownie" },
        { nome: "Mousse de Maracujá", descricao: "Sobremesa leve com sabor tropical", imagem: "https://via.placeholder.com/150?text=Mousse+de+Maracuj%C3%A1" },
        { nome: "Pavê de Chocolate", descricao: "Camadas de creme e biscoito com cobertura de chocolate", imagem: "https://via.placeholder.com/150?text=Pav%C3%AA+de+Chocolate" }
    ]
};

function loadMenuSection(sectionId, items) {
    const section = document.getElementById(sectionId);
    items.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.onclick = () => toggleSelection(card);

        const img = document.createElement("img");
        img.src = item.imagem;
        img.alt = item.nome;

        const name = document.createElement("p");
        name.textContent = item.nome;

        const description = document.createElement("p");
        description.textContent = item.descricao;

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(description);
        section.appendChild(card);
    });
}

window.onload = () => {
    loadMenuSection("entradas", menuData.entradas);
    loadMenuSection("pratos-principais", menuData.pratosPrincipais);
    loadMenuSection("acompanhamentos", menuData.acompanhamentos);
    loadMenuSection("bebidas", menuData.bebidas);
    loadMenuSection("sobremesas", menuData.sobremesas);
};

function toggleSelection(card) {
    card.classList.toggle("selected");
}

document.getElementById("enviar").addEventListener("click", () => {
    const restricoes = document.querySelectorAll(".input-box textarea")[0].value;
    const comentarios = document.querySelectorAll(".input-box textarea")[1].value;

    document.getElementById("enviar").addEventListener("click", () => {
        const menu = {
            entradas: Array.from(document.querySelectorAll("#entradas .card.selected")).map(card => card.textContent.trim()),
            pratosPrincipais: Array.from(document.querySelectorAll("#pratos-principais .card.selected")).map(card => card.textContent.trim()),
            acompanhamentos: Array.from(document.querySelectorAll("#acompanhamentos .card.selected")).map(card => card.textContent.trim()),
            bebidas: Array.from(document.querySelectorAll("#bebidas .card.selected")).map(card => card.textContent.trim()),
            sobremesas: Array.from(document.querySelectorAll("#sobremesas .card.selected")).map(card => card.textContent.trim()),
            restricoes: document.querySelectorAll(".input-box textarea")[0].value,
            comentarios: document.querySelectorAll(".input-box textarea")[1].value
        };
    
        fetch('http://localhost:8080/api/menu', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(menu)
        })
            .then(response => response.json())
            .then(data => {
                // Redirecionar para a página de avaliação com o ID do menu
                window.location.href = `avaliacao.html?id=${data.id}`;
            })
            .catch(error => console.error('Erro ao salvar o menu:', error));
    });
});    