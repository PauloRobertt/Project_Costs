package br.com.costs.Costs.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.costs.Costs.Model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {}
