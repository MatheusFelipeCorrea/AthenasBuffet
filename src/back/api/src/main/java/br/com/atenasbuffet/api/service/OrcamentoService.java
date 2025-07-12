package br.com.atenasbuffet.api.service;

import br.com.atenasbuffet.api.model.OrcamentoRestaurante;
import br.com.atenasbuffet.api.repository.OrcamentoRestauranteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrcamentoService {

    @Autowired
    private OrcamentoRestauranteRepository repository;

    public String aceitarOrcamento(Long id) {
        OrcamentoRestaurante orcamento = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Orçamento não encontrado"));
        // Lógica de aceitar o orçamento
        return "Orçamento aceito com sucesso";
    }

    public String negarOrcamento(Long id) {
        OrcamentoRestaurante orcamento = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Orçamento não encontrado"));
        // Lógica de negar o orçamento
        return "Orçamento negado com sucesso";
    }

    public OrcamentoRestaurante salvarOrcamento(OrcamentoRestaurante orcamento) {
        return repository.save(orcamento);
    }

    public List<OrcamentoRestaurante> listarOrcamentos() {
        return repository.findAll();
    }
}
