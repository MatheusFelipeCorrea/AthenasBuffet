package br.com.atenasbuffet.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.atenasbuffet.api.model.Menu;
import br.com.atenasbuffet.api.repository.MenuRepository;
@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;

    public Menu saveMenu(Menu menu) {
        return menuRepository.save(menu);
    }

    public List<Menu> findMenusByBuffetId(Long buffetId) {
        return menuRepository.findMenusByBuffetId(buffetId);
    }
}
