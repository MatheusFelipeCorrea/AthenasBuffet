document.addEventListener("DOMContentLoaded", async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        console.error("ID do usuário não encontrado no localStorage.");
        return;
    }

    // Renderiza os três gráficos ao carregar a página
    await renderGraficoOrcamentos(userId);
    await renderGraficoCandidaturas(userId);
    await renderGraficoAvaliacoes(userId);

    async function renderGraficoOrcamentos(userId) {
        const canvas = document.getElementById("graficoOrcamentos").getContext("2d");
        const porcentagemDiv = document.getElementById("orcamentos-porcentagem");
        const totalDiv = document.getElementById("orcamentos-total");

        try {
            const response = await fetch(`http://localhost:8080/api/orcamentos/buffet?idBuffet=${userId}`);
            if (!response.ok) throw new Error("Erro ao buscar dados de orçamentos.");
            const data = await response.json();

            let aceitos = 0, outros = 0;
            data.forEach(orcamento => {
                if (orcamento.status === "Aceito") aceitos++;
                else outros++;
            });

            const total = aceitos + outros;
            porcentagemDiv.innerHTML = `
                <p>Aceitos: ${(aceitos / total * 100).toFixed(1)}%</p>
                <p>Outros: ${(outros / total * 100).toFixed(1)}%</p>
            `;
            totalDiv.innerHTML = `<p>Total de Orçamentos: ${total}</p>`;

            new Chart(canvas, {
                type: "pie",
                data: {
                    labels: ["Aceitos", "Outros"],
                    datasets: [{
                        data: [aceitos, outros],
                        backgroundColor: ["#36a2eb", "#ffce56"]
                    }]
                }
            });
        } catch (error) {
            console.error("Erro ao renderizar gráfico de orçamentos:", error);
        }
    }

    async function renderGraficoCandidaturas(userId) {
        const canvas = document.getElementById("graficoCandidaturas").getContext("2d");
        const porcentagemDiv = document.getElementById("candidaturas-porcentagem");
        const totalDiv = document.getElementById("candidaturas-total");

        try {
            const response = await fetch(`http://localhost:8080/api/vagas/vagas-com-candidaturas?idBuffet=${userId}`);
            if (!response.ok) throw new Error("Erro ao buscar dados de candidaturas.");
            const data = await response.json();

            let comCandidatos = 0, semCandidatos = 0;
            data.forEach(vaga => {
                if (vaga.numeroCandidaturas > 0) comCandidatos++;
                else semCandidatos++;
            });

            const total = comCandidatos + semCandidatos;
            porcentagemDiv.innerHTML = `
                <p>Com Candidatos: ${(comCandidatos / total * 100).toFixed(1)}%</p>
                <p>Sem Candidatos: ${(semCandidatos / total * 100).toFixed(1)}%</p>
            `;
            totalDiv.innerHTML = `<p>Total de Vagas: ${total}</p>`;

            new Chart(canvas, {
                type: "pie",
                data: {
                    labels: ["Com Candidatos", "Sem Candidatos"],
                    datasets: [{
                        data: [comCandidatos, semCandidatos],
                        backgroundColor: ["#4bc0c0", "#ff6384"]
                    }]
                }
            });
        } catch (error) {
            console.error("Erro ao renderizar gráfico de candidaturas:", error);
        }
    }

    async function renderGraficoAvaliacoes(userId) {
        const canvas = document.getElementById("graficoAvaliacoes").getContext("2d");
        const porcentagemDiv = document.getElementById("avaliacoes-porcentagem");
        const totalDiv = document.getElementById("avaliacoes-total");

        try {
            const response = await fetch(`http://localhost:8080/api/feedback/buffet?idBuffet=${userId}`);
            if (!response.ok) throw new Error("Erro ao buscar dados de avaliações.");
            const data = await response.json();

            let maioresQue3 = 0, menoresOuIguaisA3 = 0;
            data.forEach(avaliacao => {
                if (avaliacao.avaliacao > 3) maioresQue3++;
                else menoresOuIguaisA3++;
            });

            const total = maioresQue3 + menoresOuIguaisA3;
            porcentagemDiv.innerHTML = `
                <p>Maiores que 3: ${(maioresQue3 / total * 100).toFixed(1)}%</p>
                <p>Menores ou Iguais a 3: ${(menoresOuIguaisA3 / total * 100).toFixed(1)}%</p>
            `;
            totalDiv.innerHTML = `<p>Total de Avaliações: ${total}</p>`;

            new Chart(canvas, {
                type: "pie",
                data: {
                    labels: ["Maiores que 3", "Menores ou Iguais a 3"],
                    datasets: [{
                        data: [maioresQue3, menoresOuIguaisA3],
                        backgroundColor: ["#9966ff", "#ff9f40"]
                    }]
                }
            });
        } catch (error) {
            console.error("Erro ao renderizar gráfico de avaliações:", error);
        }
    }
});
