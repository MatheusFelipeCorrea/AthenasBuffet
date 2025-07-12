package br.com.atenasbuffet.api.controller;

import br.com.atenasbuffet.api.service.OrcamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orcamento")
public class OrcamentoController {

    @Autowired
    private OrcamentoService orcamentoService;

    @PostMapping("/aceitar/{id}")
    public String aceitarOrcamento(@PathVariable Long id) {
        return orcamentoService.aceitarOrcamento(id);
    }

    @PostMapping("/negar/{id}")
    public String negarOrcamento(@PathVariable Long id) {
        return orcamentoService.negarOrcamento(id);
    }
}
