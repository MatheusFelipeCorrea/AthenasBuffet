package br.com.atenasbuffet.api.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.atenasbuffet.api.dto.MenuDTO;
import br.com.atenasbuffet.api.model.Menu;
import br.com.atenasbuffet.api.service.MenuService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/menus")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @PostMapping
    public ResponseEntity<?> createMenu(
            @RequestBody MenuDTO menuDTO,
            @RequestParam("buffetId") Long buffetId,
            @RequestParam("eventoId") Long eventoId,
            @RequestHeader("UserId") String userId) {

        System.out.println("Requisição recebida no endpoint /api/menus");
        System.out.println("Buffet ID: " + buffetId);
        System.out.println("Evento ID: " + eventoId);
        System.out.println("User ID: " + userId);
        System.out.println("Dados do MenuDTO: " + menuDTO);

        try {
            // Validações básicas
            if (userId == null || userId.isEmpty()) {
                throw new IllegalArgumentException("UserId não pode ser nulo ou vazio.");
            }

            // Converter o DTO para a entidade Menu
            Menu menu = new Menu();
            menu.setBuffetId(buffetId);
            menu.setEventoId(eventoId);
            menu.setClienteId(Long.parseLong(userId)); // Captura o ID do cliente
            menu.setSobremesa(menuDTO.getSobremesa());
            menu.setPratoPrincipal(menuDTO.getPratoPrincipal());
            menu.setAcompanhamento(menuDTO.getAcompanhamento());
            menu.setBebidas(menuDTO.getBebidas());
            menu.setEntrada(menuDTO.getEntrada());
            menu.setVegetariano(menuDTO.getVegetariano());
            menu.setOrcamentoMaximo(menuDTO.getOrcamentoMaximo());
            menu.setObservacoes(menuDTO.getObservacoes());

            // Salva o menu e retorna a entidade salva
            Menu savedMenu = menuService.saveMenu(menu);

            System.out.println("Menu salvo com sucesso: " + savedMenu);

            return ResponseEntity.ok(savedMenu);
        } catch (Exception e) {
            System.err.println("Erro ao processar a requisição: " + e.getMessage());
            return ResponseEntity.badRequest().body("Erro ao criar menu: " + e.getMessage());
        }
    }

    @GetMapping("/buffet/{buffetId}")
    public ResponseEntity<List<MenuDTO>> getMenusByBuffet(@PathVariable Long buffetId) {
        List<Menu> menus = menuService.findMenusByBuffetId(buffetId);

        List<MenuDTO> menuDTOs = menus.stream().map(menu -> {
            MenuDTO dto = new MenuDTO();
            dto.setSobremesa(menu.getSobremesa());
            dto.setPratoPrincipal(menu.getPratoPrincipal());
            dto.setAcompanhamento(menu.getAcompanhamento());
            dto.setBebidas(menu.getBebidas());
            dto.setEntrada(menu.getEntrada());
            dto.setVegetariano(menu.getVegetariano());
            dto.setOrcamentoMaximo(menu.getOrcamentoMaximo());
            dto.setObservacoes(menu.getObservacoes());
        
            // Resgatando informações do evento
            dto.setEventoId(menu.getEventoId()); // Adiciona o ID do evento
            dto.setIdCliente(menu.getClienteId()); // Adiciona o ID do cliente
            if (menu.getEvento() != null) {
                dto.setDataEvento(menu.getEvento().getDataEvento());
                dto.setTipoEvento(menu.getEvento().getTipoEvento());
            }
        
            // Resgatando informações do cliente
            if (menu.getCliente() != null) {
                dto.setNomeCliente(menu.getCliente().getNome());
            }
        
            return dto;
        }).collect(Collectors.toList());        

        return ResponseEntity.ok(menuDTOs);
    }
}
