async function fetchBuffets() {
    try {
        const response = await fetch('http://localhost:8080/api/buffets');
        if (!response.ok) throw new Error('Failed to fetch buffets');

        const buffets = await response.json();
        const cardsContainer = document.querySelector('.cards-container');
        cardsContainer.innerHTML = ''; 
        buffets.forEach(buffet => {
            const card = document.createElement('div');
            card.classList.add('buffet-card');
            // Redireciona para o formulario com o Id do buffet na URL
            card.addEventListener('click', () => {
                window.location.href = `../formulario_evento/formulario.html?buffetId=${buffet.idbuffet}`;
            });

            const img = document.createElement('img');
            img.src = '../Img/Selecionar_Buffet/BuffetMassas.png';
            img.alt = `Imagem de ${buffet.nomeEstabelecimento}`;
            img.classList.add('buffet-img');
            card.appendChild(img);

            const info = document.createElement('div');
            info.classList.add('buffet-info');

            const title = document.createElement('h5');
            title.textContent = buffet.nomeEstabelecimento;
            info.appendChild(title);

            const details = document.createElement('div');
            details.classList.add('buffet-details');

            const address = document.createElement('p');
            const pinIcon = document.createElement('img');
            pinIcon.src = '../Img/Selecionar_Buffet/pin.svg';
            pinIcon.alt = 'Endereço';
            pinIcon.width = 20;
            pinIcon.height = 20;
            address.appendChild(pinIcon);
            address.appendChild(document.createTextNode(` ${buffet.rua}, ${buffet.numero} - ${buffet.bairro}, CEP: ${buffet.cep}`));
            details.appendChild(address);

            const phone = document.createElement('p');
            const phoneIcon = document.createElement('img');
            phoneIcon.src = '../Img/Selecionar_Buffet/Telefone.png'; 
            phoneIcon.alt = 'Telefone';
            phoneIcon.width = 20;
            phoneIcon.height = 20;
            phone.appendChild(phoneIcon);
            phone.appendChild(document.createTextNode(` ${buffet.telefone}`));
            details.appendChild(phone);

            const rating = document.createElement('p');
            const starIcon = document.createElement('img');
            starIcon.alt = 'Nota';
            starIcon.width = 20;
            starIcon.height = 20;
            details.appendChild(rating);
            info.appendChild(details);
            card.appendChild(info);

            cardsContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao buscar os buffets:', error);
    }
}

fetchBuffets();
