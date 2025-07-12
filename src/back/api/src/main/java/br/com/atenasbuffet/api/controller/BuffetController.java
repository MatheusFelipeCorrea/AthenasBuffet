package br.com.atenasbuffet.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.atenasbuffet.api.model.Buffet;
import br.com.atenasbuffet.api.repository.BuffetRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/buffets")
public class BuffetController {

    @Autowired
    private BuffetRepository buffetRepository;

    @GetMapping
    public List<Buffet> getAllBuffets() {
        return buffetRepository.findAll();
    }
}
