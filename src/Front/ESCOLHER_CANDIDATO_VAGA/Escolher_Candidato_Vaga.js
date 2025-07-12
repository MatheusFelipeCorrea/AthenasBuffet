function searchCandidate() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const candidateCard = document.getElementById("candidateCard");

    if (searchInput === "davi") {
        candidateCard.style.display = "block";
    } else {
        candidateCard.style.display = "none";
    }
}

function approveCandidate(button) {
    button.innerText = "Aprovado";
    button.classList.add("approved");
    button.disabled = true;
}