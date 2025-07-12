document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus(); 
    expandImage();

});

// Função para verificar o estado de login e configurar o menu de opções
// Função para verificar o estado de login e configurar o menu de opções
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    const clientAreaButton = document.getElementById('clientAreaButton');
    const clientOptions = document.getElementById('clientOptions');

    clientAreaButton.onclick = (event) => {
        if (isLoggedIn) {
            // Impede o redirecionamento se o usuário estiver logado
            event.preventDefault();
            console.log("Usuário está logado. Redirecionamento bloqueado.");
        } else {
            // Redireciona para a página de login caso não esteja logado
            window.location.href = "../Login/Login.html";
        }
    };

    if (isLoggedIn) {
        // Se o usuário está logado, exibe o menu ao passar o mouse sobre o botão
        clientAreaButton.onmouseover = () => {
            clientOptions.style.display = 'block';
        };
        clientAreaButton.onmouseleave = () => {
            clientOptions.style.display = 'none';
        };
        clientOptions.onmouseenter = () => {
            clientOptions.style.display = 'block'; 
        };
        clientOptions.onmouseleave = () => {
            clientOptions.style.display = 'none'; 
        };
    } else {
        // Se o usuário não está logado, esconde o menu para evitar interações
        clientOptions.style.display = 'none';
        clientAreaButton.onmouseover = null;
        clientAreaButton.onmouseleave = null;
    }
}

// Função para redirecionar com base no identificador
function redirectToAcompanhe() {
    const userIdentifier = localStorage.getItem('userIdentifier');

    if (userIdentifier === 'Cliente') {
        window.location.href = '../Acompanhe_Pedido2/Acompanhe_Pedido_2.html';
    } else if (userIdentifier === 'Buffet') {
        window.location.href = '../Acompanhe_Pedido1/Acompanhe_Pedido_1.html';
    } else if (userIdentifier === 'Garcom') {
        window.location.href = '../AcompanheGarcom/AcompanheGarcom.html';
    } else {
        alert('Tipo de usuário não reconhecido.');
    }
}

function logout() {
    localStorage.removeItem('userId'); 
    localStorage.removeItem('userLoggedIn'); 
    localStorage.removeItem('userIdentifier'); 
    console.log('Usuário deslogado. ID removido do localStorage.');
    location.reload();
}


function expandImage() {
    const images = document.querySelectorAll(".image");
    images.forEach((image) => {
        image.addEventListener("click", () => {
            const active = document.querySelector(".active");
            if (active) active.classList.remove("active");
            image.classList.add("active");
        });
    });
}
