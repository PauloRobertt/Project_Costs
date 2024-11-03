package br.com.costs.Costs.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.costs.Costs.Model.Servico;

public interface ServicoRepository extends JpaRepository<Servico, Long> {
    Optional<Servico> findById(Long id);
    
    void deleteById(Long id);
}
