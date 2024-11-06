package br.com.costs.Costs.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.costs.Costs.Model.Projeto;

public interface ProjetoRepository extends JpaRepository<Projeto, Long> {
    Optional<Projeto> findById(Long id);
    
    void deleteById(Long id);
}
